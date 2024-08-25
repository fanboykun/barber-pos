import { Validator, type finalValidationResult, type validateType } from "ts-input-validator"

export const validateAddMember = ( name: string|null, phone: string|null, password: string|null): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: phone, key: 'phone', rules: ['required', 'string'] },
        { data: password, key: 'password', rules: ['required', 'password', 'min:5'] },
    ]
    return Validator.validate(validationInput)
}

export const validateUpdateMember = ( id:string, name: string|null, phone: string|null, password: string|null): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: id, key: 'id', rules: ['required', 'string', 'uuid'] },
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: phone, key: 'phone', rules: ['required', 'string'] },
        { data: password, key: 'password', rules: ['required', 'string', 'min:0'] },
    ]
    return Validator.validate(validationInput)
}

export const validateUpdateMemberPassword = ( id:string, password: string|null): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: id, key: 'id', rules: ['required', 'string', 'uuid'] },
        { data: password, key: 'password', rules: ['required', 'string', 'min:0'] },
    ]
    return Validator.validate(validationInput)
}