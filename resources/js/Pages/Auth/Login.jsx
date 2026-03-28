import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Ambient background blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600 opacity-20 rounded-full blur-3xl" />
            </div>

            {/* Card wrapper */}
            <div className="w-full max-w-md mx-auto">
                {/* Logo / Brand mark */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/40 mb-4">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Status message */}
                {status && (
                    <div className="mb-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
                        <svg
                            className="w-4 h-4 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email address"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1.5 block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                            />
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1.5 block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1.5"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex cursor-pointer items-center gap-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <PrimaryButton
                        className="w-full justify-center rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold tracking-wide shadow-md shadow-indigo-500/30 transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-60"
                        disabled={processing}
                    >
                        {processing ? "Signing in…" : "Sign in"}
                    </PrimaryButton>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    <span className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        or
                    </span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* Google SSO — mirrors login exactly */}
                <a
                    href="/auth/google"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 488 512"
                        fill="currentColor"
                    >
                        <path d="M488 261.8c0-17.3-1.5-34-4.3-50.3H249v95.2h134.8c-5.8 31-23 57.2-49.3 74.7v62.1h79.5c46.6-43 73.5-106 73.5-181.7zM249 492c67.4 0 123.8-22.4 165-60.7l-79.5-62.1c-22.2 14.8-50.5 23.6-85.5 23.6-65.7 0-121.5-44.4-141.5-104.4H24.1v65.6C65.2 439.1 150 492 249 492zM107.5 296.4c-5-14.8-7.9-30.6-7.9-46.4s2.9-31.6 7.9-46.4V138H24.1C8.6 171.3 0 208.2 0 246s8.6 74.7 24.1 108l83.4-65.6zM249 97.6c35.4 0 67.2 12.2 92.2 36.1l69-69C372.7 24.3 316.3 0 249 0 150 0 65.2 52.9 24.1 138l83.4 65.6C127.5 142 183.3 97.6 249 97.6z" />
                    </svg>
                    Continue with Google
                </a>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        href={route("register")}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
