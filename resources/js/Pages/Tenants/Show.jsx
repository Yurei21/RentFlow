import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Show({
    tenant,
    invoices,
    payments,
    queryParams = null,
}) {
    queryParams = queryParams || {};

    const [invoiceNumberFilter, setInvoiceNumberFilter] = useState(
        queryParams.search || "",
    );
    const [paymentReferenceFilter, setPaymentReferenceFilter] = useState(
        queryParams.search || "",
    );
    const [sortField, setSortField] = useState(
        queryParams.sort_field || "created_at",
    );
    const [sortDirection, setSortDirection] = useState(
        queryParams.sort_direction || "desc",
    );
    const [activeTab, setActiveTab] = useState("invoices");

    const handleFilterChange = (name, value) => {
        const newQueryParams = { ...queryParams };

        if (value) {
            newQueryParams.search = value;
        } else {
            delete newQueryParams.search;
        }

        const routeName =
            activeTab === "invoices" ? "invoice_page" : "payment_page";
        router.get(route("tenant.show", tenant.id), {
            ...newQueryParams,
            [routeName]: 1,
        });
    };

    const handleSort = (field) => {
        let direction = "asc";
        if (sortField === field && sortDirection === "asc") {
            direction = "desc";
        }

        setSortField(field);
        setSortDirection(direction);

        const newQueryParams = {
            ...queryParams,
            sort_field: field,
            sort_direction: direction,
        };

        router.get(route("tenant.show", tenant.id), newQueryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        handleFilterChange(name, e.target.value);
    };

    const renderSortIcon = (field) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? "↑" : "↓";
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {tenant.tenant_name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Manage invoices and payments for{" "}
                            {tenant.tenant_name}
                        </p>
                    </div>
                    <Link
                        href={route("tenant.index")}
                        className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2.5 px-5 text-gray-800 dark:text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold whitespace-nowrap"
                    >
                        ← Back to tenants
                    </Link>
                </div>
            }
        >
            <Head title={`${tenant.tenant_name} - Invoices & Payments`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tenant Details Card */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 p-8 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-2 opacity-90">
                                        Tenant Name
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {tenant.tenant_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-2 opacity-90">
                                        Room
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {tenant.room?.room_name || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-2 opacity-90">
                                        Created By
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {tenant.created_by.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Tenant ID
                                    </span>
                                    <span className="font-semibold">
                                        #{tenant.id}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Status
                                    </span>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit ${
                                            tenant.is_active
                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        {tenant.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Group
                                    </span>
                                    <span className="font-semibold">
                                        {tenant.group
                                            ? tenant.group.group_name
                                            : "No Group"}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Created at
                                    </span>
                                    <span className="font-semibold">
                                        {new Date(
                                            tenant.created_at,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Last Modified
                                    </span>
                                    <span className="font-semibold">
                                        {new Date(
                                            tenant.updated_at,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoices & Payments Tabs */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* Tabs Navigation */}
                        <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setActiveTab("invoices")}
                                    className={`px-4 py-2 font-medium rounded-lg transition-all ${
                                        activeTab === "invoices"
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                    }`}
                                >
                                    Invoices
                                </button>
                                <button
                                    onClick={() => setActiveTab("payments")}
                                    className={`px-4 py-2 font-medium rounded-lg transition-all ${
                                        activeTab === "payments"
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                    }`}
                                >
                                    Payments
                                </button>
                            </div>

                            {/* Invoices Tab */}
                            {activeTab === "invoices" && (
                                <>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Invoices
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                            {invoices.total} total{" "}
                                            {invoices.total === 1
                                                ? "invoice"
                                                : "invoices"}
                                        </p>
                                    </div>

                                    {/* Filters */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Search by Invoice Number */}
                                        <div className="relative">
                                            <svg
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                            <TextInput
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 transition-all"
                                                placeholder="Search invoice number..."
                                                value={invoiceNumberFilter}
                                                onChange={(e) =>
                                                    setInvoiceNumberFilter(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyPress={(e) => {
                                                    onKeyPress(
                                                        "invoice_number",
                                                        e,
                                                    );
                                                }}
                                            />
                                        </div>

                                        {/* Clear Filters Button */}
                                        {invoiceNumberFilter && (
                                            <button
                                                onClick={() => {
                                                    setInvoiceNumberFilter("");
                                                    router.get(
                                                        route(
                                                            "tenant.show",
                                                            tenant.id,
                                                        ),
                                                    );
                                                }}
                                                className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all"
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Payments Tab */}
                            {activeTab === "payments" && (
                                <>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Payments
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                            {payments.total} total{" "}
                                            {payments.total === 1
                                                ? "payment"
                                                : "payments"}
                                        </p>
                                    </div>

                                    {/* Filters */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Search by Reference Number */}
                                        <div className="relative">
                                            <svg
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                            <TextInput
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 transition-all"
                                                placeholder="Search reference number..."
                                                value={paymentReferenceFilter}
                                                onChange={(e) =>
                                                    setPaymentReferenceFilter(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyPress={(e) => {
                                                    onKeyPress(
                                                        "reference_number",
                                                        e,
                                                    );
                                                }}
                                            />
                                        </div>

                                        {/* Clear Filters Button */}
                                        {paymentReferenceFilter && (
                                            <button
                                                onClick={() => {
                                                    setPaymentReferenceFilter(
                                                        "",
                                                    );
                                                    router.get(
                                                        route(
                                                            "tenant.show",
                                                            tenant.id,
                                                        ),
                                                    );
                                                }}
                                                className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all"
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Invoices Table */}
                        {activeTab === "invoices" && (
                            <>
                                {invoices.data.length > 0 ? (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                                        <th className="px-6 py-4 text-left">
                                                            <button
                                                                onClick={() =>
                                                                    handleSort(
                                                                        "invoice_number",
                                                                    )
                                                                }
                                                                className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                            >
                                                                Invoice Number
                                                                <ChevronUpDownIcon className="w-4 h-4" />
                                                            </button>
                                                        </th>
                                                        <th className="px-6 py-4 text-left">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                Amount
                                                            </span>
                                                        </th>
                                                        <th className="px-6 py-4 text-left">
                                                            <button
                                                                onClick={() =>
                                                                    handleSort(
                                                                        "created_at",
                                                                    )
                                                                }
                                                                className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                            >
                                                                Created Date
                                                                <ChevronUpDownIcon className="w-4 h-4" />
                                                            </button>
                                                        </th>
                                                        <th className="px-6 py-4 text-left">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                Created By
                                                            </span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {invoices.data.map(
                                                        (invoice) => (
                                                            <tr
                                                                key={invoice.id}
                                                                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                        {
                                                                            invoice.invoice_number
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        PHP{" "}
                                                                        {
                                                                            invoice.amount
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {new Date(
                                                                            invoice.created_at,
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
                                                                        {invoice
                                                                            .created_by
                                                                            .name ||
                                                                            "N/A"}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="p-8 border-t border-gray-100 dark:border-gray-700">
                                            <Pagination
                                                links={invoices.meta.links}
                                            />
                                        </div>
                                    </>
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
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                                            No invoices found
                                        </p>
                                        {invoiceNumberFilter && (
                                            <p className="text-gray-500 dark:text-gray-500 text-sm">
                                                Try adjusting your filters
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {/* Payments Table */}
                        {activeTab === "payments" && (
                            <>
                                {payments.data.length > 0 ? (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                                        <th className="px-6 py-4 text-left">
                                                            <button
                                                                onClick={() =>
                                                                    handleSort(
                                                                        "reference_number",
                                                                    )
                                                                }
                                                                className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                            >
                                                                Reference Number
                                                                <ChevronUpDownIcon className="w-4 h-4" />
                                                            </button>
                                                        </th>
                                                        <th className="px-6 py-4 text-left">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                Amount
                                                            </span>
                                                        </th>
                                                        <th className="px-6 py-4 text-left">
                                                            <button
                                                                onClick={() =>
                                                                    handleSort(
                                                                        "created_at",
                                                                    )
                                                                }
                                                                className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                            >
                                                                Created Date
                                                                <ChevronUpDownIcon className="w-4 h-4" />
                                                            </button>
                                                        </th>
                                                        <th className="px-6 py-4 text-left">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                Created By
                                                            </span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payments.data.map(
                                                        (payment) => (
                                                            <tr
                                                                key={payment.id}
                                                                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                        {
                                                                            payment.reference_number
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        PHP{" "}
                                                                        {
                                                                            payment.amount
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {new Date(
                                                                            payment.created_at,
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
                                                                        {payment
                                                                            .created_by
                                                                            .name ||
                                                                            "N/A"}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="p-8 border-t border-gray-100 dark:border-gray-700">
                                            <Pagination
                                                links={payments.meta.links}
                                            />
                                        </div>
                                    </>
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
                                            No payments found
                                        </p>
                                        {paymentReferenceFilter && (
                                            <p className="text-gray-500 dark:text-gray-500 text-sm">
                                                Try adjusting your filters
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
