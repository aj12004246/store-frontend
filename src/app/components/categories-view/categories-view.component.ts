import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ShopService } from 'src/app/services/shop.service';
import { Category } from 'src/app/data/Category';


@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.css']
})

export class CategoriesViewComponent implements OnDestroy {

  
categories: Category [] = []

displayedColumns: string[] = ['categoryName', 'actions']
dataSource = new MatTableDataSource(this.categories)
showCategoryForm: boolean = false

sub1: Subscription
sub2: Subscription


constructor(private shopService: ShopService, private _liveAnnouncer: LiveAnnouncer) { 
  this.sub1 = shopService.$categories.subscribe(categories => {
    this.categories = categories
    this.dataSource = new MatTableDataSource(this.categories)
  })
  this.sub2 = shopService.$showCategoryForm.subscribe(showCategoryForm => this.showCategoryForm = showCategoryForm)
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
    this.shopService.tryDeleteCategory(id)
  }

  onClickAdd() {
    this.shopService.$selectedCategory.next(null)
    this.shopService.$showCategoryForm.next(true)
    this.shopService.refreshCategories();
  }

  onClickEdit(category: Category) {
    this.shopService.$selectedCategory.next(category)
    this.shopService.$showCategoryForm.next(true)
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}



