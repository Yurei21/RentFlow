<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "room_name" => ['required', 'max:100'],
            "monthly_price" => ['required', 'numeric', 'decimal:0,2'],
            "room_type" => ['nullable', 'string', 'max:255'],
            "capacity" => ['required', 'integer', 'min:1'],
            "description" => ['nullable', 'string', 'max:1000'],
            "status" => ['required', 'in:available,occupied,maintenance'],
            "group_id" => ['nullable', 'exists:group,id']
        ];
    }
}
