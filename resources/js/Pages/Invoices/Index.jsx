import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

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
    const [tenantToDelete, setTenantToDelete] = useState(null);
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Invoices
                    </h2>
                    <Link
                        href={route("invoice.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
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
