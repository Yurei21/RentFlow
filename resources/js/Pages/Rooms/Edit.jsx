import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Edit({ room, groups }) {
    const { data, setData, put, processing, errors } = useForm({
        room_name: room.room_name || "",
        monthly_price: room.monthly_price || "",
        room_type: room.room_type || "",
        capacity: room.capacity || "",
        description: room.description || "",
        status: room.status || "",
        group_id: room.group_id || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        put(route("room.update", room.id));
    };

    const groupOptions = groups.map((group) => ({
        value: group.id,
        label: group.group_name,
    }));

    const selectedGroup = groups.find((opt) => opt.id === data.group_id);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Edit Room "{room.room_name}""
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Update room details and assignments.
                    </p>
                </div>
            }
        >
            <Head title="Edit Room" />

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
                                        <select
                                            id="status"
                                            name="status"
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                                        >
                                            <option value="">
                                                Choose a status...
                                            </option>
                                            <option value="available">
                                                Available
                                            </option>
                                            <option value="occupied">
                                                Occupied
                                            </option>
                                            <option value="maintenance">
                                                Maintenance
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="group_id"
                                            value="Assign to Group (Optional)"
                                        />
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">
                                            Select the group this room belongs
                                            to (optional).
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
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="mt-8 flex items-center gap-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="px-6"
                                >
                                    {processing ? "Updating..." : "Update Room"}
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
