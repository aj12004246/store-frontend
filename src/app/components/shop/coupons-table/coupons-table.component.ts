import {Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ShopService } from 'src/app/services/shop.service';
import { Coupon } from 'src/app/data/Coupon';

@Component({
  selector: 'app-coupons-table',
  templateUrl: './coupons-table.component.html',
  styleUrls: ['./coupons-table.component.css']
})
export class CouponsTableComponent {

  
  coupons: Coupon [] = []

  displayedColumns: string[] = ['code', 'useLimit', 'percentageOff', 'amountOff', 'startDate', 'endDate', 'actions']
  dataSource = new MatTableDataSource(this.coupons)
  showCouponForm: boolean = false


  sub1: Subscription
  sub2: Subscription

  constructor(private shopService: ShopService, private _liveAnnouncer: LiveAnnouncer) { 
    this.sub1 = shopService.$coupons.subscribe(coupons => {
      this.coupons = coupons
      this.dataSource = new MatTableDataSource(this.coupons)
    })
    this.sub2 = shopService.$showCouponForm.subscribe(showCouponForm => this.showCouponForm = showCouponForm)
  }

  @ViewChild(MatSort) set matSort (sort: MatSort) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      if (sortHeaderId.includes('.')) return sortHeaderId.split('.').reduce((o,i)=>o[i], data)
      return data[sortHeaderId];
    }

    this.dataSource.sort = sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

  onClickDelete(id: number) {
    console.log(id)
    this.shopService.tryDeleteCoupon(id)
  }

  onClickAdd() {
    this.shopService.$selectedCoupon.next(null)
    this.shopService.$showCouponForm.next(true)
  }

  onClickEdit(coupon: Coupon) {
    this.shopService.$selectedCoupon.next(coupon)
    //this.shopService.setSelectedProductById(sale.productId)
    this.shopService.$showCouponForm.next(true)
  }


}
