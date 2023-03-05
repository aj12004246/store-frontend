export class Sale {
    id?: number
    salePrice: number
    percentageOff: number
    startDate: Date
    endDate: Date
    productId: number
    productName: string
    

    constructor(id: number, salePrice: number, percentageOff: number, startDate: Date, endDate: Date, productId: number, productName: string) {
        this.id = id
        this.salePrice = salePrice
        this.percentageOff = percentageOff
        this.startDate = startDate
        this.endDate = endDate
        this.productId = productId
        this.productName = productName
    }
}