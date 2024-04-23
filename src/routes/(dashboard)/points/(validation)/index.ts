import { Validator, type finalValidationResult, type validateType } from "ts-input-validator"

export const validateAddPoint = (name: string|null, minimum: number|null, discount: number|null): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: minimum, key: 'minimum', rules: ['required', 'number'] },
        { data: discount, key: 'discount', rules: ['required', 'number'] },
    ]
   
    return Validator.validate(validationInput)
}

export const validateEditPoint = (id: string|null, name: string|null, minimum: number|null, discount: number|null): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: id, key: 'id', rules: ['required', 'string'] },
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: minimum, key: 'minimum', rules: ['required', 'number'] },
        { data: discount, key: 'discount', rules: ['required', 'number'] },
    ]
   
    return Validator.validate(validationInput)
}