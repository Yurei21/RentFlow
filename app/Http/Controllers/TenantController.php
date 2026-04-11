<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Http\Requests\StoreTenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use App\Http\Resources\TenantResource;
use App\Models\Group;
use Illuminate\Support\Facades\Auth;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() 
    {
        $user = Auth::user();

        $query = Tenant::query()->with(['group.users', 'createdBy', 'updatedBy'])->where(function ($q) use ($user) {
            $q->where('created_by', $user->id)->orWhereHas('group.users', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if(request("search")) {
            $query->where("tenant_name", "like", "%" . request("search") . "%");
        }

        $tenants = $query->orderBy($sortField, $sortDirection)->paginate(20)->onEachSide(1);

        return inertia("Tenants/Index", [
            'tenants' => TenantResource::collection($tenants),
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
        return inertia("Tenants/Create", [
            'groups' => $groups
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTenantRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        //
    }
    private function authorizeTenantOwner(Tenant $tenant, $asOwner = false)
    {
        $user = Auth::user();

        if (!$tenant->group_id) {
            if ($asOwner && $tenant->created_by !== $user->id) {
                abort(403, 'Only the owner can perform this action.');
            }

            if (!$asOwner && $tenant->created_by !== $user->id) {
                abort(403, 'You do not have access to this solo tenant.');
            }
        }

        if ($tenant->group_id && $tenant->group) {
            /** @var \App\Models\Group $group */
            $group = $tenant->group;
            $isMember = $group->users()->where('user_id', $user->id)->exists();

            if (!$isMember) {
                abort(403, 'you are not a member of this tenant');
            }

            if ($asOwner && $group->created_by !== $user->id && $tenant->created_by !== $user->id) {
                abort(403, 'Only the tenant creatorr can perform this action.');
            }
        }
    }
}
