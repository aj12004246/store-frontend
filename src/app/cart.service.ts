import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { Cart } from './data/Cart';
import { Coupon } from './data/Coupon';
import { AlertErrorService } from './services/alert-error.service';
import { RegisterServicesService } from './services/register-services.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public $myCart = new BehaviorSubject<Cart>(new Cart(0, [], false, 0, 0,''))
  public $myCoupon = new BehaviorSubject<Coupon>(new Coupon('', new Date, new Date, 0 , 0, 0, 0))
  public oldCarts: Cart[] = []

  $login: Subscription

  constructor(public http: HttpClient, public register: RegisterServicesService, private erroralert: AlertErrorService, public router: Router) {
    this.$login = register.$isLoggedIn.subscribe(() =>
      this.getCartById(register.getaccId())
    )
  }

  public getCartById(id: number): void {
    this.http.get<Cart>(`https://localhost:7225/api/Carts/${id}`)
      .pipe(take(1))
      .subscribe({
        next: (cart) => {
          this.$myCart.next(cart)
          this.getCouponByCode(cart.couponCode)
        },
        error: (err) => {
          if (err.status === 404 && err.statusText == "OK") {
            this.$myCart.next(new Cart(0, [], false, 0, 0, ''))
          }
        }
      })
  }

  public addToCart(productId: number | undefined, id: number) {
    this.http.put<Cart>(`https://localhost:7225/api/Carts/addItem/${id}/${productId}`, { productId: productId, accountId: id })
      .pipe(take(1))
      .subscribe(newData => {
        this.$myCart.next(newData)
        this.erroralert.showError("Product has been added to cart")
        this.getCartById(id)
      })
  }

  public deleteFromCart(productId: number | undefined, id: number): void {
    this.http.delete(`https://localhost:7225/api/Carts/removeItem/${id}/${productId}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.getCartById(id)
        },
        error: (err) => {
          if (err.status === 404 && err.statusText == "OK" ) {
            this.$myCart.next(new Cart(0, [], false, 0, 0, ''))
          }
        }
      })
  }

  public getOrderHistory(id: number): void {
    this.http.get<Cart[]>(`https://localhost:7225/api/Carts/OrderHistory/${id}`)
      .pipe(take(1))
      .subscribe(newData => this.oldCarts = newData)
  }

  public quantity(id: number, productId: number | undefined, newQuantity: number): void {
    this.http.put<Cart>(`https://localhost:7225/api/Carts/ChangeQuantity/${id}/${productId}/${newQuantity}`, { productId: productId, accountId: id, newQuantity: newQuantity },)
      .pipe(take(1))
      .subscribe({
        next: (newData) => {
          this.$myCart.next(newData)
        },
        error: (err) => {
          if (err.status === 404 && err.text == "OK" ) {
            this.$myCart.next(new Cart(0, [], false, 0, 0, ''))
          }
        }
      })
  }

  public checkout(id: number): void {
    this.http.put<Cart>(`https://localhost:7225/api/Carts/Checkout/${id}`, { accountId: id })
      .pipe(take(1))
      .subscribe({
        next: () =>{
        this.$myCart.next(new Cart(0, [], false, 0, 0, ''))
        this.erroralert.showError("Order Complete")
        },
        error: (err) => {
          if(err.status === 400){
            this.erroralert.showError(err.error)
            this.getCartById(id)
            this.$myCoupon.next(new Coupon('', new Date, new Date, 0 , 0, 0, 0))
          }
        }
      })
  }

  public applyCouponCode(id: number, couponCode: string): void {
    console.log(id + " " + couponCode)
    this.http.post<Coupon>(`https://localhost:7225/api/Carts/AddCoupon/${couponCode}/${id}`, 
    {
      accountId: id,
      CouponCode: couponCode
    })
      .pipe(take(1))
      .subscribe({
        next: (coupon) => {
        this.getCartById(id)
        this.$myCoupon.next(coupon)
        if(coupon.amountOff > 0)
          this.erroralert.showError("Coupon applied! $" + coupon.amountOff + " will be taken off your total!")
        else if(coupon.percentageOff > 0)
          this.erroralert.showError("Coupon applied! %" + (coupon.percentageOff * 100) + " will be taken off your total!")
      },
      error: (err) => {
        if (err.status === 400) {
          this.erroralert.showError(err.error)
        }
      }
    })
  }

  public getCouponByCode(couponCode: string): void {
    this.http.get<Coupon>(`https://localhost:7225/api/Coupon/byCode/${couponCode}`)
    .pipe(take(1))
    .subscribe({
      next: (coupon) => {
        this.$myCoupon.next(coupon)
      },
      error: (err) =>{
        if (err.status === 400){
          console.log("no coupon in cart")
        }
      }
    })
  }

  public deleteCouponCode(id: number): void{
    this.http.put<Cart>(`https://localhost:7225/api/Carts/RemoveCoupon/${id}`, {})
    .pipe(take(1))
    .subscribe({
      next: (cart) =>{
        this.getCartById(cart.accountId)
      },
      error: (err) => {
        if (err.status === 400){
         console.log("huge massive secret") 
        }
      }
    })
  }
}
