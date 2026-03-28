import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

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
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create an account
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Fill in the details below to get started
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Full name"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1.5 block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1.5" />
                    </div>

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
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1.5 block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1.5"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm password"
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1.5 block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1.5"
                            />
                        </div>
                    </div>

                    <PrimaryButton
                        className="w-full justify-center rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold tracking-wide shadow-md shadow-indigo-500/30 transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-60"
                        disabled={processing}
                    >
                        {processing ? "Creating account…" : "Create account"}
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
                    Already have an account?{" "}
                    <Link
                        href={route("login")}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}