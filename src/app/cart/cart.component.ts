import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { Cart } from '../data/Cart';
import { CartItem } from '../data/CartItem';
import { Coupon } from '../data/Coupon';
import { RegisterServicesService } from '../services/register-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy{
  public myCart: Cart = new Cart(0, [], false, 0, 0,'')
  public couponCode: string = ''
  public myCoupon: Coupon = new Coupon('', new Date, new Date, 0, 0, 0, 0)
  public $couponSub: Subscription
  public $cartSub: Subscription

  constructor(public cart: CartService, public register: RegisterServicesService){
    this.$couponSub = cart.$myCoupon.subscribe(
      (coupon) => this.myCoupon = coupon
    )
    this.$cartSub = cart.$myCart.subscribe(
      (cart) => {
        this.myCart = cart
      }
    )
  }

  ngOnDestroy(): void {
    this.$couponSub.unsubscribe()
    this.$cartSub.unsubscribe()
    this.cart.deleteCouponCode(this.register.getaccId())
  }
}
