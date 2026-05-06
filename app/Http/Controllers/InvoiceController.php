<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Models\Invoice;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\TenantResource;
use App\Models\Group;
use App\Models\GroupMembers;
use App\Models\Payment;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $user = Auth::user();
        $this->authorize('viewAny', Invoice::class);

        $query = Invoice::query()->with(['group.users', 'createdBy', 'updatedBy'])->where(function ($q) use ($user) {
            $q->where('created_by', $user->id)->orWhereHas('group.users', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        });

        $sortDirection = request('sort_direction', 'desc');
        $sortField = request('sort_field', 'created_at');

        if(request('search')) {
            $search = request('search');
            $query->where('receipt_number', 'like', "%{$search}%")
                ->orWhere('id', $search)
                ->orWhere('description', $search);
        }

        $invoices = $query->orderBy($sortField, $sortDirection)->paginate(20)->onEachSide(1);

        return inertia('Invoices/Index', [
            'invoices' => InvoiceResource::collection($invoices),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Invoice::class);
        $user = Auth::user();
        $groups = Group::where('created_by', $user->id)->get();
        $tenants = Tenant::where('created_by', $user->id)->get();
        return inertia('Invoices/Create', [
            'groups' => $groups->map(fn($group) => new GroupResource($group)),
            'tenants' => $tenants->map(fn($tenant) => new TenantResource($tenant))
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        $data = $request->validated();
        $data['receipt_number'] = random_int(1000, 100000000);
        if($data['group_id']) {
            $role = GroupMembers::getUserRole(Auth::id(), $data['group_id']);
            $canStore = in_array($role, [
                GroupMembers::ROLE_ADMIN,
                GroupMembers::ROLE_MODERATOR
            ]);

            if(!$canStore){
                abort(403, 'Only admins and moderators can add an invoice');
            }
        }

        $data['created_by'] = Auth::id();
        $data['modified_by'] = Auth::id();

        Invoice::create($data);

        return to_route('invoice.index')->with('success', 'Invoices was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $this->authorize('view', $invoice);

        $payments = Payment::where('invoice_id', $invoice->id)->get();

        return inertia('Invoices/Show', [
            'invoice' => new InvoiceResource($invoice),
            'payments' => $payments->map(fn($payment) => new PaymentResource($payment))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $this->authorize('update', $invoice);
        $user = Auth::user();
        $groups = Group::where('created_by', $user->id)->get();
        $tenants = Tenant::where('created_by', $user->id)->get();
        return inertia('Invoices/Edit', [
            'invoice' => new InvoiceResource($invoice),
            'groups' => $groups->map(fn($group) => new GroupResource($group)),
            'tenants' => $tenants->map(fn($tenant) => new TenantResource($tenant))
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $this->authorize('update', $invoice);
        $data = $request->validated();
        $receipt = $invoice->receipt_number;
        $data['modified_by'] = Auth::id();

        $invoice->update($data);

        return to_route('invoice.index')->with('success', "Invoice {$receipt} has been updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $this->authorize('delete', $invoice);
        $ref = $invoice->receipt_number;

        $invoice->delete();
        return to_route('invoice.index')->with('success', "Invoice Receipt Number: \"$ref\" was deleted");
    }
}
