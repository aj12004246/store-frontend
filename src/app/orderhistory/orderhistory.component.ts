import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { Coupon } from '../data/Coupon';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnDestroy{

  public myCoupon: Coupon = new Coupon('', new Date, new Date, 0, 0, 0, 0)

  $couponSub: Subscription

  constructor(public cart: CartService){
    this.$couponSub = cart.$myCoupon.subscribe(
      (coupon) => this.myCoupon = coupon
    )}
  
  ngOnDestroy(): void {
    this.$couponSub.unsubscribe()
  }

  public getCoupon(code: string): string {
    this.cart.getCouponByCode(code)
    if(this.myCoupon.amountOff > 0)
    return "Coupon Code: " + this.myCoupon.code + " Amount Off: $" + this.myCoupon.amountOff
    else
    return "Coupon Code: " + this.myCoupon.code + " Percentage Off: " +  this.myCoupon.percentageOff + "%"
  }

}
