import { Head, Link } from "@inertiajs/react";

export default function LandingPage({ auth }) {
    return (
        <>
            <Head title="RentFlow - Smart Rental Management" />

            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950 dark:text-gray-100 min-h-screen flex flex-col">
                {/* Hero Section */}
                <header className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-blue-100 dark:border-blue-900/30">
                    <div className="max-w-7xl mx-auto px-6 py-28 text-center">
                        <img 
                            src="/logo.png" 
                            alt="RentFlow Logo" 
                            className=" mx-auto mb-6 drop-shadow-lg rounded-xl"
                        />
                        <div className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                            Smart Property Solutions
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
                            Manage Your Rentals
                            <br />
                            Effortlessly
                        </h1>
                        <p className="text-lg sm:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Streamline property management, track tenants, and
                            handle payments—all in one intuitive platform
                            designed for modern landlords.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold"
                                >
                                    Go to Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="px-8 py-4 border-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 font-semibold"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Features Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                                Everything You Need in One Place
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Powerful features designed to make property
                                management simple and efficient
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="group bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-7 h-7 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                    Property Management
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Keep track of all your properties, units,
                                    and availability in one centralized
                                    dashboard.
                                </p>
                            </div>

                            <div className="group bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-7 h-7 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                    Tenant Management
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Manage tenant details, lease agreements, and
                                    rental history with ease and efficiency.
                                </p>
                            </div>

                            <div className="group bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-7 h-7 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                    Payments & Billing
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Track rent payments, set reminders, and
                                    generate professional invoices
                                    automatically.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-700 dark:via-indigo-700 dark:to-blue-800 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                            Ready to Simplify Your
                            <br />
                            Rental Management?
                        </h2>
                        <p className="text-xl mb-10 text-blue-100">
                            Join hundreds of property managers who trust our
                            platform
                        </p>
                        <Link
                            href={
                                auth.user
                                    ? route("dashboard")
                                    : route("register")
                            }
                            className="inline-block px-10 py-5 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:scale-105"
                        >
                            {auth.user
                                ? "Go to Dashboard →"
                                : "Get Started Now — It's Free"}
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-10 text-center text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                    <p>
                        &copy; {new Date().getFullYear()} RentFlow. All rights
                        reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}