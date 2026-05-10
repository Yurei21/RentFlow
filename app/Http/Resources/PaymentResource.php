<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property \App\Models\Invoice $invoice
 * @property float $amount_paid
 * @property string $payment_date
 * @property string $payment_method
 * @property string $reference_number
 * @property \App\Models\User $createdBy
 * @property \App\Models\User $updatedBy
 * @property string $created_at
 * @property string $updated_at
 */
class PaymentResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice' => new InvoiceResource($this->invoice),
            'group' => new GroupResource($this->group),
            'tenant' => new TenantResource($this->tenant),
            'amount_paid' => $this->amount_paid,
            'payment_date' => $this->payment_date,
            'payment_method' => $this->payment_method,
            'reference_number' => $this->reference_number,
            'created_by' => new UserResource($this->createdBy),
            'modified_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
