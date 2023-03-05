export class Product {
    public availableOn: Date
    //Todo update to type Category[]
    public categories: []
    public description: string
    public discontinued: boolean
    public displayName: string
    public id?: number
    public img: string
    public map: number
    public numInStock: number
    public onSale: boolean
    public price: number
    //Todo update to type PriceChange
    public priceChanges: []
    public productName: string
    public quantityAtCost?: number
    public salePrice: number
    //Todo update to type Sale[]
    public sales: []
    

    constructor(
        availableOn: Date, 
        categories: [], 
        description: string, 
        discontinued: boolean, 
        displayName: string, 
        id: number, 
        img: string, 
        map: number, 
        numInStock: number,
        onSale: boolean, 
        price: number,
        priceChanges: [], 
        productName: string, 
        quantityAtCost: number,
        salePrice: number, 
        sales: []) {
            this.availableOn = availableOn
            this.categories = categories
            this.description = description
            this.discontinued = discontinued
            this.displayName = displayName
            this.id = id
            this.img = img
            this.map = map
            this.numInStock = numInStock
            this.onSale = onSale
            this.price = price
            this.priceChanges = priceChanges
            this.productName = productName
            this.quantityAtCost = quantityAtCost
            this.salePrice = salePrice
            this.sales = sales
        }
}