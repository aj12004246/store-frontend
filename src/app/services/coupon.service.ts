import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from "rxjs";
import { Coupon } from "../data/Coupon";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  coupons = new BehaviorSubject<Coupon[]>([])

  constructor(private http: HttpService) {
    this.refreshCoupons()
  }

  refreshCoupons() {
    this.http.getCoupons().pipe(take(1)).subscribe({
      next: (coupons) => {
        this.coupons.next(coupons)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  tryAddCoupon(couponToAdd: Coupon) {
    this.http.addCoupon(couponToAdd).pipe(take(1)).subscribe({
      next: (newCoupon) => {
        this.coupons.next([...this.coupons.getValue(), newCoupon])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  tryDeleteCoupon(id: number) {
    this.http.deleteCoupon(id).pipe(take(1)).subscribe({
      next: () => {
        this.coupons.next([...this.coupons.getValue().filter(c => c.id !== id)])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  tryUpdateCoupon(couponToUpdate: Coupon) {
    this.http.updateCoupon(couponToUpdate).subscribe({
      next: (updatedCoupon) => {

      },
      error: (err) => {
        console.error(err)
        console.log(couponToUpdate)
      }
    })
  }


}
