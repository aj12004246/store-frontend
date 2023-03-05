import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coupon } from 'src/app/data/Coupon';
import { ShopService } from 'src/app/services/shop.service';

const ADD: string = "Add"
const UPDATE: string = "Update"

@Component({
  selector: 'app-coupons-input',
  templateUrl: './coupons-input.component.html',
  styleUrls: ['./coupons-input.component.css']
})
export class CouponsInputComponent {
  coupons: Coupon[] = []
  coupon: Coupon = {
    code: '',
    startDate: new Date,
    endDate: new Date,
    useLimit: 0,
    amountOff: 0,
    percentageOff: 0,
    id: 0
  }

  isPercentage: boolean = false
  minDate: Date = new Date()
  selectedCoupon: Coupon | null = null

  addOrUpdateText: string = ADD

  sub1: Subscription
  sub3: Subscription

  constructor(private shopService: ShopService) {
    this.sub1 = shopService.$selectedCoupon.subscribe(
      coupon =>  {
        if (coupon) {
          this.coupon = coupon
          this.addOrUpdateText = UPDATE
        }
        else
          this.addOrUpdateText = ADD
      }
    )
    this.sub3 = shopService.$selectedCoupon.subscribe(
      selectedCoupon => this.selectedCoupon = selectedCoupon
    )
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe
  }

  onClickCancel() {
    this.shopService.$selectedCoupon.next(null)
    this.shopService.$showCouponForm.next(false)
  }


  onSubmit() {
    if(this.isPercentage){
        this.coupon.amountOff = 0;
        this.coupon.percentageOff = this.coupon.percentageOff / 100;
        console.log(this.coupon.percentageOff);
    } else {
      this.coupon.percentageOff = 0;
      console.log(this.coupon.percentageOff);
    }

    if(this.shopService.validateCouponInput(this.coupon))
    {
      if (!this.shopService.$selectedCoupon.getValue()) {
        console.log("tryaddcoupon function")
        let couponToAdd = this.coupon
        delete couponToAdd.id
        this.shopService.tryAddCoupon(couponToAdd)
      }
      else{
        console.log("try update coupon function")
        this.shopService.tryUpdateCoupon(this.coupon)}
  }
  
}

}
