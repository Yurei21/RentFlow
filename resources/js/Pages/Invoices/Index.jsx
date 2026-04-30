import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({invoices, queryParams = null, success}) {
    queryParams = queryParams || {};
    const [showSuccess, setShowSuccess] = useState(!!success);
    const [search, setSearch] = useState(queryParams.search || "");
    const [sortField, setSortField] = useState(
        queryParams.sort_field || "created_at"
    );
    const [sortDirection, setSortDirection] = useState(
        queryParams.sort_direction || "desc"
    );

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000)
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

    const onKeyPress = (description, e) => {
        if (e.key !== "enter") return;

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
    };

    const closeDeleteModal = () => {
        setInvoiceToDelete(null);
        setShowDeleteModal(false);
    };
    
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
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
                        <div className="mb-6 animate-in fade-in duration-300 bg-emerald-50 dark:bg-emerald-600/20 border-emerald-200 dark:border-emerald-800 px-6 py-3 rounded-lg flex items-center gap-3 shadow-sm">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <p className="text-emerald-800 dark:text-emerald-200 font-medium text-sm">
                                {success}
                            </p>
                        </div>
                    )}

                    <div className="mb-8">
                        <div className="flex gap-4 flex-col sm:flex-row">
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
                                <TextInput className="w-full pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 transition-all"
                                    placeholder="Search invoices by description"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
