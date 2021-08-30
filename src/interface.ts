export interface ProductType {
    id: number
    title: string
    price: number
    quantity: number
}

export interface CartType {
    key: number
    product: { id: number; title: string; price: number; quantity: number }
    handleRemoveProduct: (event: any, id: number) => void
    handleQuantityChange: (id: number, value: number) => void
    getQuantityAfterDiscount: (id: number) => void
}

export interface DiscountType {
    id: number
    get: number
    pay: number
    title: string
}