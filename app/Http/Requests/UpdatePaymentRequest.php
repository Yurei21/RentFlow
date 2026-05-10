<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invoice_id' => ['required', 'exists:invoices,id'],
            'group_id' => ['nullable', 'exists:groups,id'],
            'tenant_id' => ['required', 'exists:tenants,id'],
            'amount_paid' => ['required', 'numeric'],
            'payment_date' => ['required', 'date', 'after_or_equal:today'],
            'payment_method' => ['required', Rule::in(['Cash', 'Gcash', 'Bank', 'Online'])]
        ];
    }
}
