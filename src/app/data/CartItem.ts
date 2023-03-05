export class CartItem {
     constructor(
        public id: number ,
        public productName: string,
        public productId: number,
        public total: number,
        public quantity: number,
        public cartId: number
     ){}


}