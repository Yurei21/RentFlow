<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Http\Resources\TenantResource;
use App\Models\Group;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $query = Room::query()->with(['group.users', 'createdBy', 'updatedBy'])->where(function ($q) use ($user) {
            $q->where('created_by', $user->id)->orWhereHas('group.users', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("search")) {
            $query->where("room_name", "like", "%" . request("search") . "%");
        }

        $rooms = $query->orderBy($sortField, $sortDirection)->paginate(9)->onEachSide(1);

        return inertia("Rooms/Index", [
            'rooms' => RoomResource::collection($rooms),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $groups = Group::where('created_by', $user->id)->get();
        return inertia("Rooms/Create", ['groups' => $groups]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['modified_by'] = Auth::id();

        Room::create($data);

        return to_route('room.index')->with('success', 'Room was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        $query = $room->tenants();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("tenant_name")) {
            $query->where("tenant_name", "like", "%" . request("tenant_name") . "%");
        }

        if (request("is_active")) {
            $query->where("is_active", request("is_active"));
        }

        $tenants = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Rooms/Show', [
            'room' => new RoomResource($room),
            'tenants' => TenantResource::collection($tenants),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        $user = Auth::user();
        $availableGroups = Group::where('created_by', $user->id)->get();

        return inertia('Rooms/Edit', [
            'room' => new RoomResource($room),
            'groups' => $availableGroups
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        $data = $request->validated();
        $data['modified_by'] = Auth::id();

        $room->update($data);

        return to_route('room.index')->with('success', 'Room was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $name = $room->room_name;

        $room->delete();
        return to_route('room.index')->with('success', "Room \"$name\" was deleted");
    }
}
