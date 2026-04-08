<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Http\Requests\StoreTenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use Illuminate\Support\Facades\Auth;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

        if ($tenant->group_id) {
            $isMember = $tenant->group->users()->where('user_id', $user->id)->exists();

            if (!$isMember) {
                abort(403, 'you are not a member of this tenant');
            }

            if ($asOwner && $tenant->group->owner_id !== $user->id && $tenant->created_by !== $user->id) {
                abort(403, 'Only the tenant creatorr can perform this action.');
            }
        }
    }
}
