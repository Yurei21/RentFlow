import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import TextInput from "@/Components/TextInput";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";

export default function Index({ tenants, queryParams = null, success }) {
    queryParams = queryParams || {};
    const [showSuccess, setShowSuccess] = useState(!!success);
    const [searchTerm, setSearchTerm] = useState(queryParams.search || "");
    const [sortField, setSortField] = useState(
        queryParams.sort_field || "created_at",
    );
    const [sortDirection, setSortDirection] = useState(
        queryParams.sort_direction || "desc",
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tenantToDelete, setTenantToDelete] = useState(null);
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("tenant.index"), queryParams);
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
        router.get(route("tenant.index"), newParams);
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === "desc" ? "asc" : "desc";
        setSortDirection(newDirection);

        const newParams = {
            ...queryParams,
            sort_field: sortField,
            sort_direction: newDirection,
        };
        router.get(route("tenant.index"), newParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const openDeleteModal = (tenant) => {
        setTenantToDelete(tenant);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!tenantToDelete) return;

        router.visit(route("tenant.destroy", tenantToDelete.id), {
            method: "delete",
            preserveScroll: true,
            preserveState: false,
        });
        setShowDeleteModal(false);
        setTenantToDelete(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setTenantToDelete(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Tenants
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Manage and organize all your rental tenants
                        </p>
                    </div>
                    <Link
                        href={route("tenant.create")}
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
            <Head title="Tenants" />

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
                                    placeholder="Search tenants by name..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        onKeyPress("search", e);
                                        setSearchTerm(e.target.value);
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
                                <option value="tenant_name">Tenant Name</option>
                                <option value="is_active">Status</option>
                            </select>

                            {/* Sort Direction Toggle */}
                            <button
                                onClick={toggleSortDirection}
                                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-all font-medium flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${sortDirection === "asc" ? "" : "rotate-180"}`}
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
                    {tenants.data.length > 0 ? (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="cursor-pointer select-none px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                                    Tenant Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Created By
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Room
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
                                            {tenants.data.map((tenant) => (
                                                <tr
                                                    key={tenant.id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                        <Link href={route('tenant.show', tenant.id)}>
                                                            {tenant.tenant_name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {
                                                            tenant.created_by
                                                                ?.name
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {tenant.room
                                                            ?.room_name || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                                tenant.is_active
                                                                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                                                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                                            }`}
                                                        >
                                                            {tenant.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {tenant.created_at}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-center">
                                                        <div className="flex items-center justify-center gap-3">
                                                            <Link
                                                                href={route(
                                                                    "tenant.edit",
                                                                    tenant.id,
                                                                )}
                                                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
                                                            >
                                                                <PencilIcon className="w-5 h-5" />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    openDeleteModal(
                                                                        tenant,
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
                                <Pagination links={tenants.meta.links} />
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
                                        d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-6">
                                No tenants found
                            </p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
                                Start by creating your first tenant to get
                                organized
                            </p>
                            <Link
                                href={route("tenant.create")}
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
                                Create your first tenant
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
                        Delete Tenant
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
                        Are you sure you want to delete tenant "
                        <strong>{tenantToDelete?.tenant_name}</strong>"? This
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
