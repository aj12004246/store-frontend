export class ScheduledPrice {
    id?: number
    price: number
    startDate: Date
    productId: number
    productName: string
    isMap: boolean
    isApplied: boolean
    

    constructor(id: number, price: number, startDate: Date, productId: number, productName: string, isMap: boolean, isApplied: boolean) {
        this.id = id
        this.price = price
        this.startDate = startDate,
        this.productId = productId,
        this.productName = productName
        this.isMap = isMap
        this.isApplied = isApplied
    }
}