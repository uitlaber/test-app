<?php

namespace App\Http\Requests\API\Auth;

use App\Http\Resources\API\System\ValidationErrorResource;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|confirmed|min:8'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = new ValidationErrorResource($validator->errors());
        throw new ValidationException($validator, $response);
    }
}
