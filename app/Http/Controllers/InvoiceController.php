<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
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
    public function store(StoreInvoiceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
    private function authorizeInvoiceOwner(Invoice $invoice, $asOwner = false)
    {
        $user = Auth::user();

        if (!$invoice->group_id) {
            if ($asOwner && $invoice->created_by !== $user->id) {
                abort(403, 'Only the owner can perform this action.');
            }

            if (!$asOwner && $invoice->created_by !== $user->id) {
                abort(403, 'You do not have access to this solo invoice.');
            }
        }

        if ($invoice->group_id) {
            $isMember = $invoice->group->users()->where('user_id', $user->id)->exists();

            if (!$isMember) {
                abort(403, 'you are not a member of this invoice');
            }

            if ($asOwner && $invoice->group->created_by !== $user->id && $invoice->created_by !== $user->id) {
                abort(403, 'Only the invoice creatorr can perform this action.');
            }
        }
    }
}
