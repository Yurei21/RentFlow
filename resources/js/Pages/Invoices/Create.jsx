import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Create({ groups, tenants }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tenant_id: "",
        amount: "",
        billing_date: "",
        due_date: "",
        status: "",
        description: "",
        group_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("invoice.store"));
    };

    const groupOptions = groups.map((groups) => ({
        value: groups.id,
        label: groups.group_name,
    }));

    const tenantOptions = tenants.map((tenant) => ({
        value: tenant.id,
        label: tenant.tenant_name,
    }));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Create an invoice
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Add an invoice for a tenant.
                    </p>
                </div>
            }
        >
            <Head title="Create Invoice" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <form onSubmit={onSubmit} className="p-6 sm:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Amount */}
                                <div>
                                    <InputLabel
                                        htmlFor="amount"
                                        value="Amount"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                        Assign a bill to a tenant.
                                    </p>
                                    <TextInput
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={data.amount}
                                        className="mt-2 block w-full"
                                        placeholder="₱3000"
                                        onChange={(e) => {
                                            setData("amount", e.target.value);
                                        }}
                                    />
                                    <InputError
                                        message={errors.amount}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Billing Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="billing_date"
                                        value="Billing Date"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                        Assign a billing date for this invoice.
                                    </p>
                                    <TextInput
                                        id="billing_date"
                                        type="date"
                                        name="billing_date"
                                        value={data.billing_date}
                                        className="mt-2 block w-full"
                                        onChange={(e) => {
                                            setData(
                                                "billing_date",
                                                e.target.value,
                                            );
                                        }}
                                    />
                                    <InputError
                                        message={errors.billing_date}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Due Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="due_date"
                                        value="Due Date"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                        Assign a due date for this billing
                                        invoice.
                                    </p>
                                    <TextInput
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-2 block w-full"
                                        onChange={(e) => {
                                            setData("due_date", e.target.value);
                                        }}
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                        Is the invoice paid?
                                    </p>
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                    >
                                        <option value="">
                                            Choose a status...
                                        </option>
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Overdue">Overdue</option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tenant */}
                                <div>
                                    <InputLabel
                                        htmlFor="tenant_id"
                                        value="Tenant"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                        Assign this invoice to a tenant.
                                    </p>
                                    <select
                                        id="tenant_id"
                                        name="tenant_id"
                                        value={data.tenant_id}
                                        onChange={(e) =>
                                            setData("tenant_id", e.target.value)
                                        }
                                        className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                    >
                                        <option value="">
                                            Choose a tenant...
                                        </option>
                                        {tenantOptions.map((tenant) => (
                                            <option
                                                key={tenant.value}
                                                value={tenant.value}
                                            >
                                                {tenant.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.tenant_id}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Group */}
                                <div>
                                    <InputLabel
                                        htmlFor="group_id"
                                        value="Assign to Group (Optional)"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                        Assign this invoice to a group property.
                                    </p>
                                    <select
                                        id="group_id"
                                        name="group_id"
                                        value={data.group_id}
                                        onChange={(e) =>
                                            setData("group_id", e.target.value)
                                        }
                                        className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                    >
                                        <option value="">
                                            Choose a group...
                                        </option>
                                        {groupOptions.map((group) => (
                                            <option
                                                key={group.value}
                                                value={group.value}
                                            >
                                                {group.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.group_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Description - Full Width */}
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                    Add additional details about the invoice.
                                </p>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    rows="5"
                                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                    placeholder="Add details about the invoice"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex items-center gap-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="px-6"
                                >
                                    {processing
                                        ? "Creating..."
                                        : "Create Invoice"}
                                </PrimaryButton>
                                <Link href={route("invoice.index")}>
                                    <SecondaryButton type="button">
                                        Cancel
                                    </SecondaryButton>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
