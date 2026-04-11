import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        
    })

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Create a tenant
                    </h2>
                </div>
            }
        >
            <Head title="Create Tenant" />

        </AuthenticatedLayout>
    );
}