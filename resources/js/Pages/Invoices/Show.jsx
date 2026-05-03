import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PencilIcon } from "@heroicons/react/20/solid";

export default function Show({ invoice, payments }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {invoice.receipt_number}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Invoice details and payments
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route("invoice.edit", invoice.id)}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 py-2.5 px-5 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold whitespace-nowrap"
                        >
                            <PencilIcon className="w-5 h-5" />
                            Edit
                        </Link>
                        <Link
                            href={route("invoice.index")}
                            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2.5 px-5 text-gray-800 dark:text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold whitespace-nowrap"
                        >
                            ← Back
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`${invoice.receipt_number} - Invoice`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Invoice Details Card */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600 p-8 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-2 opacity-90">
                                        Tenant
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {invoice.tenant_id?.tenant_name || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-2 opacity-90">
                                        Amount
                                    </p>
                                    <p className="text-2xl font-bold">
                                        PHP {invoice.amount}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-2 opacity-90">
                                        Created By
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {invoice.created_by?.name || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Receipt Number
                                    </span>
                                    <span className="font-semibold">
                                        {invoice.receipt_number}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Billing Date
                                    </span>
                                    <span className="font-semibold">
                                        {invoice.billing_date}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Due Date
                                    </span>
                                    <span className="font-semibold">
                                        {invoice.due_date}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Status
                                    </span>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit ${
                                            invoice.status === "paid"
                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                                : invoice.status === "pending"
                                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                        }`}
                                    >
                                        {invoice.status
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            invoice.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Group
                                    </span>
                                    <span className="font-semibold">
                                        {invoice.group
                                            ? invoice.group.group_name
                                            : "No Group"}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Created
                                    </span>
                                    <span className="font-semibold">
                                        {new Date(
                                            invoice.created_at,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                            {invoice.description && (
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                                        Description
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {invoice.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payments Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Payments
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        {payments.length} total{" "}
                                        {payments.length === 1
                                            ? "payment"
                                            : "payments"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payments Table */}
                        {payments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Amount
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Payment Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Method
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibolamod text-gray-900 dark:text-white">
                                                Reference
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Recorded By
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr
                                                key={payment.id}
                                                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        PHP{" "}
                                                        {payment.amount}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {new Date(
                                                            payment.payment_date,
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            },
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {payment.payment_method ||
                                                            "N/A"}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {payment.reference_number ||
                                                            "N/A"}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {payment.created_by
                                                            ?.name || "N/A"}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center p-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                                    <svg
                                        className="w-8 h-8 text-gray-400 dark:text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                                    No payments recorded
                                </p>
                                <p className="text-gray-500 dark:text-gray-500 text-sm">
                                    Payments will appear here once they are
                                    recorded
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
