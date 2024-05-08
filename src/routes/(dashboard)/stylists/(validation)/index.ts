import { Validator, type finalValidationResult, type validateType } from "ts-input-validator"

export const validateAddStylist = ( name: string|null, email: string|null, password: string|null ): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: email, key: 'email', rules: ['required', 'email'] },
        { data: password, key: 'password', rules: ['required', 'string'] },
    ]
    return Validator.validate(validationInput)
}

export const validateUpdateStylist = ( id:string|null, name: string|null, email: string|null ): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: id, key: 'id', rules: ['required', 'string', 'uuid'] },
        { data: name, key: 'name', rules: ['required', 'string'] },
        { data: email, key: 'email', rules: ['required', 'email'] },
    ]
    return Validator.validate(validationInput)
}

export const validateUpdateStylistPassword = ( id:string|null, password:string|null ): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: id, key: 'id', rules: ['required', 'string', 'uuid'] },
        { data: password, key: 'password', rules: ['required', 'string'] },
    ]
    return Validator.validate(validationInput)
}