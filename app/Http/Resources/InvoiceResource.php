<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $receipt_number
 * @property \App\Models\Tenant $tenant
 * @property float $amount
 * @property string $billing_date
 * @property string $due_date
 * @property string $status
 * @property string $description
 * @property \App\Models\User $createdBy
 * @property \App\Models\User $updatedBy
 * @property string $created_at
 * @property string $updated_at
 */
class InvoiceResource extends JsonResource
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
            'receipt_number' => $this->receipt_number,
            'tenant_id' => new TenantResource($this->tenant),
            'amount' => $this->amount,
            'billing_date' => $this->billing_date,
            'due_date' => $this->due_date,
            'status' => $this->status,
            'description' => $this->description,
            'created_by' => new UserResource($this->createdBy),
            'modified_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
