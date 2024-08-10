import { Validator, type finalValidationResult, type validateType } from "ts-input-validator"
export type TransactionFormData = {
    stylistId: string|null|undefined,
    customerId: string|null|undefined,
    treatmentId: string|null|undefined,
    pointId: string|null|undefined,
    normalPrice: number|null|undefined,
    totalDiscount: number|null|undefined,
    totalPrice: number|null|undefined,
    totalPoint: number|null|undefined
}
export const validateAddTransaction = ( data: TransactionFormData ): finalValidationResult => {
    const validationInput: validateType[] = [
        { data: data.stylistId, key: 'stylistId', rules: ['required', 'string'] },
        { data: data.customerId, key: 'customerId', rules: ['nullable', 'string'] },
        { data: data.treatmentId, key: 'treatmentId', rules: ['required', 'string'] },
        { data: data.pointId, key: 'pointId', rules: ['nullable', 'string'] },
        { data: data.normalPrice, key: 'normalPrice', rules: ['required', 'number'] },
        { data: data.totalDiscount, key: 'totalDiscount', rules: ['nullable', 'number'] },
        { data: data.totalPrice, key: 'totalPrice', rules: ['required', 'number'] },
        { data: data.totalPoint, key: 'totalPoint', rules: ['required', 'number'] },
    ]
    return Validator.validate(validationInput)
}