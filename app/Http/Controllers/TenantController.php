<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\Tenant;
use App\Http\Requests\StoreTenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\TenantResource;
use App\Models\Group;
use App\Models\Room;
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
        $rooms = Room::where('created_by', $user->id)->get();
        return inertia("Tenants/Create", [
            'groups' => $groups,
            'rooms' => $rooms
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTenantRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['modified_by'] = Auth::id();

        Tenant::create($data);

        return to_route('tenant.index')->with('success', 'Tenant was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        $this->authorizeTenantOwner($tenant);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $invoiceQuery = $tenant->invoices();
        if(request("search")) {
            $invoiceQuery->where(
                "invoice_number",
                "like",
                "%" . request("search")
            );
        }
        $invoices = $invoiceQuery->orderBy($sortField, $sortDirection)->paginate(10, ['*'], 'invoice_page')->onEachSide(1);

        $paymentQuery = $tenant->payments();
        if (request("search")) {
            $invoiceQuery->where(
                "reference_number",
                "like",
                "%" . request("search")
            );
        }
        $payments = $paymentQuery->orderBy($sortField, $sortDirection)->paginate(10, ['*'], 'payment_page')->onEachSide(1);

        return inertia('Tenants/Show', [
            'tenant' => new TenantResource($tenant),
            'invoices' => InvoiceResource::collection($invoices),
            'payments' => PaymentResource::collection($payments),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant)
    {
        $this->authorizeTenantOwner($tenant, true);

        $user = Auth::user();
        $availableGroups = Group::where('created_by', $user->id)->get();
        $availableRooms = Room::where('status', 'available')->get();

        return inertia('Tenants/Edit', [
            'tenant' => new TenantResource($tenant),
            'groups' => $availableGroups,
            'rooms' => $availableRooms
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        $this->authorizeTenantOwner($tenant, true);
        $data = $request->validated();
        $data['modified_by'] = Auth::id();

        $tenant->update($data);

        return to_route('tenant.index')->with('success', 'Tenant was successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        $this->authorizeTenantOwner($tenant, true);

        $name = $tenant->tenant_name;

        $tenant->delete();

        return to_route('tenant.index')->with('success', "Tenant \"$name\" was deleted");
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
