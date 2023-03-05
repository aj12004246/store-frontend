import { CartItem } from "./CartItem";

export class Cart{
        constructor(
            public id: number,
            public items: CartItem[],
            public isCheckedOut: boolean,
            public accountId: number,
            public total: number,
            public couponCode: string
        ){}


}