import { Head, Link } from "@inertiajs/react";

export default function LandingPage({ auth }) {
    return (
        <>
            <Head title="RentFlow - Smart Rental Management" />

            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950 dark:text-gray-100 min-h-screen flex flex-col">
                {/* ── NAV ─────────────────────────────────────────────── */}
                <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-blue-100/60 dark:border-blue-900/30">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/30">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
                                RentFlow
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md shadow-blue-500/25 font-medium text-sm"
                                >
                                    Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="px-5 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md shadow-blue-500/25 font-medium text-sm"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── HERO ────────────────────────────────────────────── */}
                <header className="relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
                        <div className="flex justify-center mb-8">
                            <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10 ring-1 ring-blue-200 dark:ring-blue-800/50 shadow-xl shadow-blue-500/10">
                                <img
                                    src="/logo.png"
                                    alt="RentFlow Logo"
                                    className="h-20 w-auto rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold ring-1 ring-blue-200 dark:ring-blue-700/50">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Smart Property Solutions
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight tracking-tight">
                            Manage Your Rentals
                            <br />
                            <span className="opacity-80">Effortlessly</span>
                        </h1>

                        <p className="text-lg sm:text-xl mb-12 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Streamline property management, track tenants, and
                            handle payments—all in one intuitive platform
                            designed for modern landlords.
                        </p>

                        <div className="flex justify-center gap-4 flex-wrap">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 font-semibold"
                                >
                                    Go to Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 font-semibold"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="px-8 py-4 border-2 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="mt-12 inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-gray-800/60 rounded-full ring-1 ring-gray-200 dark:ring-gray-700/60 shadow-sm text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex -space-x-2">
                                {[
                                    "bg-blue-400",
                                    "bg-indigo-400",
                                    "bg-sky-400",
                                    "bg-blue-500",
                                ].map((c, i) => (
                                    <div
                                        key={i}
                                        className={`w-7 h-7 rounded-full ${c} ring-2 ring-white dark:ring-gray-800 flex items-center justify-center text-white text-xs font-bold`}
                                    >
                                        {["A", "B", "C", "D"][i]}
                                    </div>
                                ))}
                            </div>
                            <span>
                                Trusted by{" "}
                                <strong className="text-gray-700 dark:text-gray-200">
                                    500+
                                </strong>{" "}
                                landlords
                            </span>
                        </div>
                    </div>
                </header>

                {/* ── STATS BAR ────────────────────────────────────────── */}
                <div className="border-y border-blue-100/80 dark:border-blue-900/30 bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm">
                    <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                        {[
                            { value: "500+", label: "Active Landlords" },
                            { value: "12k+", label: "Properties Managed" },
                            { value: "99.9%", label: "Uptime SLA" },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                    {value}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FEATURES ─────────────────────────────────────────── */}
                <section className="py-28">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
                                Features
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
                                Everything You Need in One Place
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                Powerful tools designed to make property
                                management simple, efficient, and stress-free.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                {
                                    gradient: "from-blue-500 to-indigo-600",
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    ),
                                    title: "Property Management",
                                    desc: "Keep track of all your properties, units, and availability in one centralized dashboard with real-time updates.",
                                    tag: "Centralized",
                                },
                                {
                                    gradient: "from-indigo-500 to-blue-600",
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    ),
                                    title: "Tenant Management",
                                    desc: "Manage tenant details, lease agreements, and rental history with ease and full legal compliance.",
                                    tag: "Organized",
                                },
                                {
                                    gradient: "from-blue-600 to-indigo-500",
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    ),
                                    title: "Payments & Billing",
                                    desc: "Track rent payments, set automated reminders, and generate professional invoices in seconds.",
                                    tag: "Automated",
                                },
                            ].map(({ gradient, icon, title, desc, tag }) => (
                                <div
                                    key={title}
                                    className="group relative bg-white dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/60 group-hover:to-indigo-50/30 dark:group-hover:from-blue-900/10 dark:group-hover:to-indigo-900/10 transition-all duration-300 rounded-2xl" />
                                    <div className="relative">
                                        <div className="flex items-start justify-between mb-5">
                                            <div
                                                className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <svg
                                                    className="w-7 h-7 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    {icon}
                                                </svg>
                                            </div>
                                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full ring-1 ring-blue-100 dark:ring-blue-800/50">
                                                {tag}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                            {title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                                            {desc}
                                        </p>
                                        <div className="mt-6 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                                            Learn more
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ─────────────────────────────────────── */}
                <section className="py-24 bg-white/60 dark:bg-gray-800/20 backdrop-blur-sm border-y border-blue-100/60 dark:border-blue-900/20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
                                How It Works
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Up and Running in Minutes
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 relative">
                            <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-blue-300 via-indigo-400 to-blue-300 dark:from-blue-700 dark:via-indigo-600 dark:to-blue-700" />
                            {[
                                {
                                    step: "01",
                                    title: "Add Your Properties",
                                    desc: "Enter your property details and units in under 2 minutes.",
                                },
                                {
                                    step: "02",
                                    title: "Invite Tenants",
                                    desc: "Send invites and manage lease agreements digitally.",
                                },
                                {
                                    step: "03",
                                    title: "Collect Rent",
                                    desc: "Automate billing and get notified when payments arrive.",
                                },
                            ].map(({ step, title, desc }) => (
                                <div
                                    key={step}
                                    className="relative text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-500/30">
                                        {step}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ─────────────────────────────────────── */}
                <section className="py-28">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-10">
                            What Landlords Say
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    quote: "RentFlow cut my admin time in half. Collecting rent used to be a nightmare — now it's completely hands-off.",
                                    name: "Maria S.",
                                    role: "Portfolio Landlord, 8 units",
                                },
                                {
                                    quote: "The tenant management tools are incredible. Every lease, document and payment history in one place.",
                                    name: "James T.",
                                    role: "Property Manager, 23 units",
                                },
                            ].map(({ quote, name, role }) => (
                                <div
                                    key={name}
                                    className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 text-left border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                                >
                                    <svg
                                        className="w-8 h-8 text-blue-200 dark:text-blue-800 mb-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                                        {quote}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                            {name[0]}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {name}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ──────────────────────────────────────────────── */}
                <section className="mx-4 sm:mx-8 mb-20 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-700 dark:via-indigo-700 dark:to-blue-800 text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
                        }}
                    />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative max-w-3xl mx-auto px-8 py-20 text-center">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold ring-1 ring-white/30">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Free to get started · No credit card required
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight tracking-tight">
                            Ready to Simplify Your
                            <br />
                            Rental Management?
                        </h2>
                        <p className="text-lg mb-10 text-blue-100">
                            Join hundreds of property managers who trust our
                            platform
                        </p>
                        <Link
                            href={
                                auth.user
                                    ? route("dashboard")
                                    : route("register")
                            }
                            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:-translate-y-0.5"
                        >
                            {auth.user
                                ? "Go to Dashboard"
                                : "Get Started Now — It's Free"}
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────── */}
                <footer className="py-10 px-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-blue-100/60 dark:border-blue-900/20">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            </div>
                            <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                                RentFlow
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            &copy; {new Date().getFullYear()} RentFlow. All
                            rights reserved.
                        </p>
                        <div className="flex gap-5 text-sm text-gray-400 dark:text-gray-500">
                            <a
                                href="#"
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Terms
                            </a>
                            <a
                                href="#"
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
