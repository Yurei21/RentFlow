import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function Edit({ room, groups, availableGroups }) {
    const { data, setData, put, processing, errors } = useForm({
        room_name: room.room_name || "",
        group_id: room.group_id || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        put(route("room.update", room.id));
    };

    const groupOptions = availableGroups.map((group) => ({
        value: group.id,
        label: group.group_name,
    }));

    const selectedGroup = availableGroups.find(
        (opt) => opt.id === data.group_id,
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                        Edit Room
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Update room details and assignments.
                    </p>
                </div>
            }
        >
            <Head title="Edit Room" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <form onSubmit={onSubmit} className="p-6 sm:p-8">
                            {/* Room Name Field */}
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
                                        setData("room_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.room_name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Group Field */}
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="group_id"
                                    value="Assign to Group"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">
                                    Select the group this room belongs to
                                    (optional).
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
                                                opt.value === data.group_id,
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
                                    message={errors.group_id}
                                    className="mt-2"
                                />
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
