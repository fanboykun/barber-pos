import { Validator, type finalValidationResult, type validateType } from "ts-input-validator"

export const validateAddTreatment = ( name: string|null, price: number|null, point: number|null, sub_service: string|null ): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: price, key: 'price', rules: ['required', 'number'] },
        { data: point, key: 'point', rules: ['required', 'number', 'min:0'] },
        { data: sub_service, key: 'sub_service', rules: ['nullable', 'string'] },
    ]
    return Validator.validate(validationInput)
}

export const validateUpdateTreatment = ( id:string, name: string|null, price: number|null, point: number|null, sub_service: string|null ): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: id, key: 'id', rules: ['required', 'string', 'uuid'] },
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: price, key: 'price', rules: ['required', 'number'] },
        { data: point, key: 'point', rules: ['required', 'number', 'min:0'] },
        { data: sub_service, key: 'sub_service', rules: ['nullable', 'string'] },
    ]
    return Validator.validate(validationInput)
}