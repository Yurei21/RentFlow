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
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Invoices
                    </h2>
                    <Link
                        href={route("invoice.create")}
                        className="inline-flex items-center bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
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
                                d="M12 dv16m8-8H4"
                            />
                        </svg>
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Invoices" />
            <div>

            </div>
        </AuthenticatedLayout>
    );
}
