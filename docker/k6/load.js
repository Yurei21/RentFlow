import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = __ENV.BASE_URL || "http://host.docker.internal:8000";
const users = JSON.parse(__ENV.K6_USERS_JSON || "[]");

export const options = {
    scenarios: {
        authenticated_users: {
            executor: "ramping-vus",
            startVUs: 1,
            stages: [
                { duration: "30s", target: Number(__ENV.K6_VUS || 5) },
                {
                    duration: __ENV.K6_DURATION || "2m",
                    target: Number(__ENV.K6_VUS || 5),
                },
                { duration: "30s", target: 0 },
            ],
            gracefulRampDown: "15s",
        },
    },
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<1000", "p(99)<2000"],
        checks: ["rate>0.99"],
    },
};

export default function () {
    if (users.length === 0) {
        throw new Error("K6_USERS_JSON must contain at least one user");
    }

    const user = users[(__VU - 1) % users.length];

    const loginPage = http.get(`${baseUrl}/login`);

    const tokenMatch = loginPage.body.match(
        /name="_token"[^>]+value="([^"]+)"/,
    );

    check(loginPage, {
        "login page loads": (response) => response.status === 200,
        "CSRF token exists": () => tokenMatch !== null,
    });

    if (!tokenMatch) {
        return;
    }

    const login = http.post(
        `${baseUrl}/login`,
        {
            _token: tokenMatch[1],
            email: user.email,
            password: user.password,
        },
        {
            redirects: 0,
            tags: { endpoint: "login" },
        },
    );

    check(login, {
        "login succeeds": (response) =>
            response.status === 302 || response.status === 303,
    });

    const dashboard = http.get(`${baseUrl}/dashboard`, {
        tags: { endpoint: "dashboard" },
    });

    check(dashboard, {
        "dashboard succeeds": (response) => response.status === 200,
    });

    const rooms = http.get(`${baseUrl}/room`, {
        tags: { endpoint: "rooms" },
    });

    check(rooms, {
        "rooms page succeeds": (response) => response.status === 200,
    });

    const tenants = http.get(`${baseUrl}/tenant`, {
        tags: { endpoint: "tenants" },
    });

    check(tenants, {
        "tenants page succeeds": (response) => response.status === 200,
    });

    sleep(Math.random() * 3 + 1);
}
