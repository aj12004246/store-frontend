import {Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ShopService } from 'src/app/services/shop.service';
import { Sale } from 'src/app/data/Sale';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css']
})
export class SaleTableComponent {
  sales: Sale[] = []

  displayedColumns: string[] = ['productName', 'percentageOff', 'salePrice', 'startDate', 'endDate', 'actions']
  dataSource = new MatTableDataSource(this.sales)
  showSaleForm: boolean = false


  sub1: Subscription
  sub2: Subscription

  constructor(private shopService: ShopService, private _liveAnnouncer: LiveAnnouncer) { 
    this.sub1 = shopService.$sales.subscribe(sales => {
      this.sales = sales
      this.dataSource = new MatTableDataSource(this.sales)
    })
    this.sub2 = shopService.$showSaleForm.subscribe(showSaleForm => this.showSaleForm = showSaleForm)
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
    this.shopService.tryDeleteSale(id)
  }

  onClickAdd() {
    this.shopService.$selectedSale.next(null)
    this.shopService.$showSaleForm.next(true)
  }

  onClickEdit(sale: Sale) {
    this.shopService.$selectedSale.next(sale)
    this.shopService.setSelectedProductById(sale.productId)
    this.shopService.$showSaleForm.next(true)
  }

}
