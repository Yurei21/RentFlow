import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function Edit({ groups, tenant, rooms }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        tenant_id: tenant.tenant_id || "",
        room_id: tenant.room.id || "",
        tenant_name: tenant.tenant_name || "",
        is_active: tenant.is_active || false,
        group_id: tenant.group_id || "",
    });

    console.log(tenant);

    const onSubmit = (e) => {
        e.preventDefault();

        put(route("tenant.update", tenant.id));
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
                        Edit Tenant "{tenant.tenant_name}"
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Update the tenant's information.
                    </p>
                </div>
            }
        >
            <Head title="Edit Tenant" />
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
                                        <p className="text-xs text-gray-500 dark:text-gray-450 mt-1 mb-2">
                                            Assign this tenant to a room
                                        </p>
                                        <Select
                                            name="room_id"
                                            options={roomOptions}
                                            isClearable
                                            placeholder="Choose a room..."
                                            value={
                                                roomOptions.find(
                                                    (opt) =>
                                                        opt.value ===
                                                        data.room_id,
                                                ) || null
                                            }
                                            onChange={(selected) =>
                                                setData(
                                                    "room_id",
                                                    selected?.value || "",
                                                )
                                            }
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    borderColor: state.isFocused
                                                        ? "#2563eb"
                                                        : "#d1d5db",
                                                    backgroundColor: "#ffffff",
                                                    padding: "0.5rem 0.75rem",
                                                    fontSize: "0.875rem",
                                                    minHeight: "42px",
                                                    boxShadow: state.isFocused
                                                        ? "0 0 0 3px rgb(37 99 235 / 0.1)"
                                                        : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                                                    transition: "all 0.2s",
                                                    color: "#111827",
                                                    "&:hover": {
                                                        borderColor:
                                                            state.isFocused
                                                                ? "#2563eb"
                                                                : "#9ca3af",
                                                    },
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor:
                                                        state.isSelected
                                                            ? "#2563eb"
                                                            : state.isFocused
                                                              ? "#f3f4f6"
                                                              : "#ffffff",
                                                    color: state.isSelected
                                                        ? "#ffffff"
                                                        : "#111827",
                                                    padding: "0.625rem 0.75rem",
                                                    fontSize: "0.875rem",
                                                    cursor: "pointer",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: "#111827",
                                                }),
                                                input: (base) => ({
                                                    ...base,
                                                    color: "#111827",
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    boxShadow:
                                                        "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                                    border: "1px solid #e5e7eb",
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    padding: "0.5rem 0",
                                                }),
                                                clearIndicator: (base) => ({
                                                    ...base,
                                                    color: "#9ca3af",
                                                    "&:hover": {
                                                        color: "#6b7280",
                                                    },
                                                }),
                                            }}
                                            className="mt-2"
                                        />
                                        <InputError
                                            message={errors.rooms}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="group_id"
                                            value="Assign to Group (Optional)"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-450 mt-1 mb-2">
                                            Assign this room to a group property
                                        </p>
                                        <Select
                                            name="group_id"
                                            options={groupOptions}
                                            isClearable
                                            placeholder="Choose a group..."
                                            value={
                                                groupOptions.find(
                                                    (opt) =>
                                                        opt.value ===
                                                        data.group_id,
                                                ) || null
                                            }
                                            onChange={(selected) =>
                                                setData(
                                                    "group_id",
                                                    selected?.value || "",
                                                )
                                            }
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    borderColor: state.isFocused
                                                        ? "#2563eb"
                                                        : "#d1d5db",
                                                    backgroundColor: "#ffffff",
                                                    padding: "0.5rem 0.75rem",
                                                    fontSize: "0.875rem",
                                                    minHeight: "42px",
                                                    boxShadow: state.isFocused
                                                        ? "0 0 0 3px rgb(37 99 235 / 0.1)"
                                                        : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                                                    transition: "all 0.2s",
                                                    color: "#111827",
                                                    "&:hover": {
                                                        borderColor:
                                                            state.isFocused
                                                                ? "#2563eb"
                                                                : "#9ca3af",
                                                    },
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor:
                                                        state.isSelected
                                                            ? "#2563eb"
                                                            : state.isFocused
                                                              ? "#f3f4f6"
                                                              : "#ffffff",
                                                    color: state.isSelected
                                                        ? "#ffffff"
                                                        : "#111827",
                                                    padding: "0.625rem 0.75rem",
                                                    fontSize: "0.875rem",
                                                    cursor: "pointer",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: "#111827",
                                                }),
                                                input: (base) => ({
                                                    ...base,
                                                    color: "#111827",
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    boxShadow:
                                                        "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                                    border: "1px solid #e5e7eb",
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    padding: "0.5rem 0",
                                                }),
                                                clearIndicator: (base) => ({
                                                    ...base,
                                                    color: "#9ca3af",
                                                    "&:hover": {
                                                        color: "#6b7280",
                                                    },
                                                }),
                                            }}
                                            className="mt-2"
                                        />
                                        <InputError
                                            message={errors.groups}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="is_active"
                                            value="Is it Active?"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-450 mt-1 mb-2">
                                            Is the user active?
                                        </p>
                                        <Select
                                            name="status"
                                            options={[
                                                {
                                                    value: true,
                                                    label: "True",
                                                },
                                                {
                                                    value: false,
                                                    label: "False",
                                                },
                                            ]}
                                            placeholder="Choose a status..."
                                            value={
                                                [
                                                    {
                                                        value: true,
                                                        label: "True",
                                                    },
                                                    {
                                                        value: false,
                                                        label: "False",
                                                    },
                                                ].find(
                                                    (opt) =>
                                                        opt.value ===
                                                        data.is_active,
                                                ) || null
                                            }
                                            onChange={(selected) =>
                                                setData(
                                                    "is_active",
                                                    selected?.value ?? false,
                                                )
                                            }
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    borderColor: state.isFocused
                                                        ? "#2563eb"
                                                        : "#d1d5db",
                                                    backgroundColor: "#ffffff",
                                                    padding: "0.5rem 0.75rem",
                                                    fontSize: "0.875rem",
                                                    minHeight: "42px",
                                                    boxShadow: state.isFocused
                                                        ? "0 0 0 3px rgb(37 99 235 / 0.1)"
                                                        : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                                                    transition: "all 0.2s",
                                                    color: "#111827",
                                                    "&:hover": {
                                                        borderColor:
                                                            state.isFocused
                                                                ? "#2563eb"
                                                                : "#9ca3af",
                                                    },
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor:
                                                        state.isSelected
                                                            ? "#2563eb"
                                                            : state.isFocused
                                                              ? "#f3f4f6"
                                                              : "#ffffff",
                                                    color: state.isSelected
                                                        ? "#ffffff"
                                                        : "#111827",
                                                    padding: "0.625rem 0.75rem",
                                                    fontSize: "0.875rem",
                                                    cursor: "pointer",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: "#111827",
                                                }),
                                                input: (base) => ({
                                                    ...base,
                                                    color: "#111827",
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    boxShadow:
                                                        "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                                    border: "1px solid #e5e7eb",
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    padding: "0.5rem 0",
                                                }),
                                                clearIndicator: (base) => ({
                                                    ...base,
                                                    color: "#9ca3af",
                                                    "&:hover": {
                                                        color: "#6b7280",
                                                    },
                                                }),
                                            }}
                                            className="mt-2"
                                        />
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
                                        ? "Updating..."
                                        : "Update Tenant"}
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
