import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Create({ groups, rooms }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        room_id: "",
        tenant_name: "",
        is_active: false,
        group_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("tenant.store"));
    };

    const groupOptions = groups.map((groups) => ({
        value: groups.id,
        label: groups.group_name,
    }));

    const roomOptions = rooms.map((rooms) => ({
        value: rooms.id,
        label: rooms.room_name,
    }));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Create a tenant
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Add a tenant for a room.
                    </p>
                </div>
            }
        >
            <Head title="Create Tenant" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <form onSubmit={onSubmit} className="p-6 sm:p-8">
                            <div className="flex flex-row gap-8">
                                <div className="flex-1">
                                    <div>
                                        <InputLabel
                                            htmlFor="tenant_name"
                                            value="Tenant Name"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-450 mt-1 mb-2">
                                            Assign name for the tenant.
                                        </p>
                                        <TextInput
                                            id="tenant_name"
                                            type="text"
                                            name="tenant_name"
                                            value={data.tenant_name}
                                            className="mt-2 block w-full"
                                            placeholder="e.g. John Doe, Jane Doe"
                                            isFocused={true}
                                            onChange={(e) => {
                                                setData(
                                                    "tenant_name",
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                        <InputError
                                            message={errors.tenant_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="room_id"
                                            value="Assign to a room"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                            Assign this tenant to a room
                                        </p>
                                        <select
                                            id="room_id"
                                            name="room_id"
                                            value={data.room_id}
                                            onChange={(e) =>
                                                setData(
                                                    "room_id",
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                        >
                                            <option value="">
                                                Choose a room...
                                            </option>
                                            {roomOptions.map((room) => (
                                                <option
                                                    key={room.value}
                                                    value={room.value}
                                                >
                                                    {room.label}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.room_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="group_id"
                                            value="Assign to Group (Optional)"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                            Assign this tenant to a group
                                            property
                                        </p>
                                        <select
                                            id="group_id"
                                            name="group_id"
                                            value={data.group_id}
                                            onChange={(e) =>
                                                setData(
                                                    "group_id",
                                                    e.target.value,
                                                )
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
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="is_active"
                                            value="Is it Active?"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                            Is the user active?
                                        </p>
                                        <select
                                            id="is_active"
                                            name="is_active"
                                            value={data.is_active}
                                            onChange={(e) =>
                                                setData(
                                                    "is_active",
                                                    e.target.value === "true",
                                                )
                                            }
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                        >
                                            <option value="">
                                                Choose status...
                                            </option>
                                            <option value="true">Active</option>
                                            <option value="false">
                                                Inactive
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.is_active}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center gap-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="px-6"
                                >
                                    {processing
                                        ? "Creating..."
                                        : "Create Tenant"}
                                </PrimaryButton>
                                <Link href={route("room.index")}>
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
