<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupResource;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\TenantResource;
use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Group;
use App\Models\GroupMembers;
use App\Models\Invoice;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $this->authorize('viewAny', Payment::class);

        $query = Payment::query()->with(['group.users', 'createdBy', 'updatedBy'])->where(function ($q) use ($user) {
            $q->where('created_by', $user->id)->orWhereHas('group.users', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        });

        $sortDirection = request('sortDirection', 'desc');
        $sortField = request('sortField', 'created_at');

        if (request('search')) {
            $search = request('search');
            $query->where('reference_number', 'like', "%{$search}%")
                ->orWhere('id', $search)
                ->orWhere('invoice_id', $search);
        }

        $payments = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Payments/Index", [
            'payments' => PaymentResource::collection($payments),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Payment::class);

        $user = Auth::user();
        $tenants = Tenant::where('created_by', $user->id)->get();
        $invoices = Invoice::where('created_by', $user->id)->get();
        $groups = Group::where('created_by', $user->id)->get();

        return inertia("Payments/Create", [
            'tenants' => $tenants->map(fn($tenant) => new TenantResource($tenant)),
            'invoices' => $invoices->map(fn($invoice) => new InvoiceResource($invoice)),
            'groups' => $groups->map(fn($group) => new GroupResource($group))
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $data = $request->validated();
        $data['reference_number'] = random_int(1000, 100000000);
        if ($data['group_id']) {
            $role = GroupMembers::getUserRole(Auth::id(), $data['group_id']);
            $canStore = in_array($role, [
                GroupMembers::ROLE_ADMIN,
                GroupMembers::ROLE_MODERATOR
            ]);

            if (!$canStore) {
                abort(403, 'Only admins and moderators can add an invoice');
            }
        }

        $data['created_by'] = Auth::id();
        $data['modified_by'] = Auth::id();

        Payment::create($data);

        return to_route('payment.index')->with('success', 'Payment has been successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $this->authorize('view', $payment);

        return inertia("Payments/Show", [
            'payment' => new PaymentResource($payment)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $this->authorize('update', $payment);

        $user = Auth::user();
        $tenants = Tenant::where('created_by', $user->id)->get();
        $invoices = Invoice::where('created_by', $user->id)->get();
        $groups = Group::where('created_by', $user->id)->get();

        return inertia("Payments/Edit", [
            'payment' => new PaymentResource($payment),
            'tenants' => $tenants->map(fn($tenant) => new TenantResource($tenant)),
            'invoices' => $invoices->map(fn($invoice) => new InvoiceResource($invoice)),
            'groups' => $groups->map(fn($group) => new GroupResource($group))
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $this->authorize('update', $payment);
        $data = $request->validated();
        $data['modified_by'] = Auth::id();
        $ref = $payment->reference_number;

        $payment->update($data);

        return to_route("payment.index")->with('success', "Payment: \"$ref\" has been successfully edited");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $this->authorize('delete', $payment);
        $ref = $payment->reference_number;

        $payment->delete();

        return to_route('payment.index')->with('success', "Payment: \"$ref\" has been successfully deleted");
    }
}
