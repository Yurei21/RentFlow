import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function Create({ groups }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        room_name: "",
        monthly_price: "",
        room_type: "",
        capacity: "",
        description: "",
        status: "",
        group_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("room.store"));
    };

    const groupOptions = groups.map((groups) => ({
        value: groups.id,
        label: groups.group_name,
    }));
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Create Room
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Add a room for tenants.
                    </p>
                </div>
            }
        >
            <Head title="Create a room" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <form onSubmit={onSubmit} className="p-6 sm:p-8">
                            <div className="flex flex-row gap-8">
                                <div className="flex-1">
                                    <div>
                                        <InputLabel
                                            htmlFor="room_name"
                                            value="Room Name"
                                        />
                                        <TextInput
                                            id="room_name"
                                            type="text"
                                            name="room_name"
                                            value={data.room_name}
                                            className="mt-2 block w-full"
                                            placeholder="e.g., Master Bedroom, Studio Apartment"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "room_name",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.room_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="monthly_price"
                                            value="Monthly Price"
                                        />
                                        <TextInput
                                            id="monthly_price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            name="monthly_price"
                                            value={data.monthly_price}
                                            className="mt-2 block w-full"
                                            placeholder="e.g., 3000.00"
                                            onChange={(e) =>
                                                setData(
                                                    "monthly_price",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.monthly_price}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="room_type"
                                            value="Room Type"
                                        />
                                        <TextInput
                                            id="room_type"
                                            type="text"
                                            name="room_type"
                                            value={data.room_type}
                                            className="mt-2 block w-full"
                                            placeholder="e.g., Studio, Apartment, Bedroom"
                                            onChange={(e) =>
                                                setData(
                                                    "room_type",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.room_type}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="capacity"
                                            value="Capacity (Max Tenants)"
                                        />
                                        <TextInput
                                            id="capacity"
                                            type="number"
                                            name="capacity"
                                            value={data.capacity}
                                            className="mt-2 block w-full"
                                            placeholder="1"
                                            min="1"
                                            onChange={(e) =>
                                                setData(
                                                    "capacity",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.capacity}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            rows="6"
                                            className="mt-2 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 shadow-sm transition duration-200 placeholder-surface-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 dark:placeholder-surface-400 dark:focus:border-primary-400 dark:focus:ring-primary-400/20"
                                            placeholder="Add details about the room: amenities, features, location benefits, etc."
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="status"
                                            value="Status"
                                        />
                                        <Select
                                            name="status"
                                            options={[
                                                {
                                                    value: "available",
                                                    label: "Available",
                                                },
                                                {
                                                    value: "occupied",
                                                    label: "Occupied",
                                                },
                                                {
                                                    value: "maintenance",
                                                    label: "Maintenance",
                                                },
                                            ]}
                                            className="basic-select"
                                            classNamePrefix="select"
                                            placeholder="Choose a status..."
                                            value={
                                                [
                                                    {
                                                        value: "available",
                                                        label: "Available",
                                                    },
                                                    {
                                                        value: "occupied",
                                                        label: "Occupied",
                                                    },
                                                    {
                                                        value: "maintenance",
                                                        label: "Maintenance",
                                                    },
                                                ].find(
                                                    (opt) =>
                                                        opt.value ===
                                                        data.status,
                                                ) || null
                                            }
                                            onChange={(selected) =>
                                                setData(
                                                    "status",
                                                    selected?.value || "",
                                                )
                                            }
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    borderColor: "#e5e7eb",
                                                    backgroundColor: "#ffffff",
                                                    marginTop: "0.5rem",
                                                    "&:hover": {
                                                        borderColor: "#d1d5db",
                                                    },
                                                }),
                                            }}
                                        />
                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Group Field */}
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
                                            className="basic-select"
                                            classNamePrefix="select"
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
                                                control: (base) => ({
                                                    ...base,
                                                    borderColor: "#e5e7eb",
                                                    backgroundColor: "#ffffff",
                                                    marginTop: "0.5rem",
                                                    "&:hover": {
                                                        borderColor: "#d1d5db",
                                                    },
                                                }),
                                            }}
                                        />
                                        <InputError
                                            message={errors.groups}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="mt-8 flex items-center gap-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="px-6"
                                >
                                    {processing ? "Creating..." : "Create Room"}
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
