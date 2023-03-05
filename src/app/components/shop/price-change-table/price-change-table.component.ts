import {Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ShopService } from 'src/app/services/shop.service';
import { ScheduledPrice } from 'src/app/data/ScheculedPrice';
import { Product } from 'src/app/data/Product';

@Component({
  selector: 'app-price-change-table',
  templateUrl: './price-change-table.component.html',
  styleUrls: ['./price-change-table.component.css']
})
export class PriceChangeTableComponent {
  prices: ScheduledPrice[] = []

  displayedColumns: string[] = ['productName', 'isMap', 'price', 'startDate', 'isApplied', 'actions']
  dataSource = new MatTableDataSource(this.prices)
  showPriceForm: boolean = false


  sub1: Subscription
  sub2: Subscription

  constructor(private shopService: ShopService, private _liveAnnouncer: LiveAnnouncer) { 
    this.sub1 = shopService.$priceChanges.subscribe(prices => {
      this.prices = prices
      this.dataSource = new MatTableDataSource(this.prices)
    })
    this.sub2 = shopService.$showPriceForm.subscribe(showPriceForm => this.showPriceForm = showPriceForm)
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
    this.shopService.tryDeletePriceChange(id)
  }

  onClickAdd() {
    this.shopService.$selectedProduct.next(null)
    this.shopService.$selectedScheduledPrice.next(null)
    this.shopService.$showPriceForm.next(true)
  }

  onClickEdit(price: ScheduledPrice) {
    this.shopService.$selectedScheduledPrice.next(price)
    this.shopService.setSelectedProductById(price.productId)
    this.shopService.$showPriceForm.next(true)
  }
}
