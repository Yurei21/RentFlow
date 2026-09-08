import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Create({tenants, invoices, groups}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tenant_id: "",
        invoice_id: "",
        group_id: "",
        amount_paid: "",
        payment_date: "",
        payment_method: "",
    });

    const groupOptions = groups.map((group) => ({
        value: group.id,
        label: group.group_name
    }));

    const tenantsOption = tenants.map((tenant) => ({
        value: tenant.id,
        label: tenant.tenant_name
    }));
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Create Payment
                    </h2>
                </div>
            }
        >

        </AuthenticatedLayout>
    );
}