import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";

export default function Index({ invoices, queryParams = null, success }) {
    queryParams = queryParams || {};
    const [showSuccess, setShowSuccess] = useState(!!success);
    const [search, setSearch] = useState(queryParams.search || "");
    const [sortField, setSortField] = useState(
        queryParams.sort_field || "created_at",
    );
    const [sortDirection, setSortDirection] = useState(
        queryParams.sort_direction || "desc",
    );

    console.log(invoices)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }, [showSuccess]);

    const searchFieldChange = (description, value) => {
        if (value) {
            queryParams[description] = value;
        } else {
            delete queryParams[description];
        }

        router.get(route("invoice.index"), queryParams);
    };

    const handleSortChange = (field, direction = null) => {
        const newDirection = direction !== null ? direction : sortDirection;
        setSortField(field);
        setSortDirection(newDirection);

        const newParams = {
            ...queryParams,
            sort_field: field,
            sort_direction: newDirection,
        };

        router.get(route("invoice.index"), newParams);
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === "desc" ? "asc" : "desc";
        setSortDirection(newDirection);

        const newParams = {
            ...queryParams,
            sort_field: sortField,
            sort_direction: newDirection,
        };
        router.get(route("invoice.index"), newParams);
    };

    const onKeyPress = (description, e) => {
        if (e.key !== "Enter") return;

        searchFieldChange(description, e.target.value);
    };

    const openDeleteModal = (invoice) => {
        setInvoiceToDelete(invoice);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!invoiceToDelete) return;
        router.visit(route("invoice.destroy", invoiceToDelete.id), {
            method: "delete",
            preserveScroll: true,
            preserveState: false,
        });
        setShowDeleteModal(false);
        setInvoiceToDelete(null);
    };

    const closeDeleteModal = () => {
        setInvoiceToDelete(null);
        setShowDeleteModal(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Invoices
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Organize invoices for all of your tenants
                        </p>
                    </div>

                    <Link
                        href={route("invoice.create")}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-2.5 px-5 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold whitespace-nowrap"
                    >
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Invoices" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {showSuccess && success && (
                        <div className="mb-6 animate-in fade-in duration-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-6 py-3 rounded-lg flex items-center gap-3 shadow-sm">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <p className="text-emerald-800 dark:text-emerald-200 font-medium text-sm">
                                {success}
                            </p>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="flex gap-4 flex-col sm:flex-row">
                            {/* Search Input */}
                            <div className="flex-1 relative">
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
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 transition-all"
                                    placeholder="Search invoices by description..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => {
                                        onKeyPress("search", e);
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>

                            {/* Sort Field Dropdown */}
                            <select
                                value={sortField}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)
                                }
                                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 transition-all font-medium"
                            >
                                <option value="created_at">Created</option>
                                <option value="description">Description</option>
                                <option value="due_date">Due Date</option>
                                <option value="status">Status</option>
                            </select>

                            {/* Sort Direction Toggle */}
                            <button
                                onClick={toggleSortDirection}
                                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-all font-medium flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${
                                        sortDirection === "asc"
                                            ? ""
                                            : "rotate-180"
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                                    />
                                </svg>
                                {sortDirection === "asc" ? "A-Z" : "Z-A"}
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    {invoices.data.length > 0 ? (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Description
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Tenant
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Due Date
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Created At
                                                </th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {invoices.data.map((invoice) => (
                                                <tr
                                                    key={invoice.id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                        <Link
                                                            href={route(
                                                                "invoice.show",
                                                                invoice.id,
                                                            )}
                                                        >
                                                            {
                                                                invoice.description
                                                            }
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {invoice.tenant_id
                                                            ?.tenant_name ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                        PHP {invoice.amount}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {invoice.due_date}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                                invoice.status ===
                                                                "paid"
                                                                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                                                    : invoice.status ===
                                                                        "pending"
                                                                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                                                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                                            }`}
                                                        >
                                                            {invoice.status
                                                                ?.charAt(0)
                                                                .toUpperCase() +
                                                                invoice.status?.slice(
                                                                    1,
                                                                ) || "Unknown"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {invoice.created_at}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-center">
                                                        <div className="flex items-center justify-center gap-3">
                                                            <Link
                                                                href={route(
                                                                    "invoice.edit",
                                                                    invoice.id,
                                                                )}
                                                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
                                                            >
                                                                <PencilIcon className="w-5 h-5" />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    openDeleteModal(
                                                                        invoice,
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
                                                            >
                                                                <TrashIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="mt-8">
                                <Pagination links={invoices.meta.links} />
                            </div>
                        </>
                    ) : (
                        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm p-16 border border-gray-100 dark:border-gray-700">
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
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-6">
                                No invoices found
                            </p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
                                Start by creating your first invoice to get
                                organized
                            </p>
                            <Link
                                href={route("invoice.create")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-3 px-6 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
                            >
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create your first invoice
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                maxWidth="md"
            >
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                        <svg
                            className="w-6 h-6 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                        Delete Invoice
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
                        Are you sure you want to delete invoice "
                        <strong>{invoiceToDelete?.description}</strong>"? This
                        action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={closeDeleteModal}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium transition-all"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
