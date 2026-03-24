<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    use HasFactory;

    protected $fillable = [
        'receipt_number',
        'tenant_id',
        'amount',
        'billing_date',
        'due_date',
        'status',
        'description',
        'created_by',
        'modified_by'
    ];

    public function payments() {
        return $this->hasMany(Payment::class);
    }

    public function tenant() {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }
}
