import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/data/Category';
import { ShopService } from 'src/app/services/shop.service';

const ADD: string = "Add"
const UPDATE: string = "Update"

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-input.component.css']
})
export class CategoriesInputComponent {


  categories: Category[] = []
  category: Category = {
    id: 0,
    categoryName: ''
  }

  selectedCategory: Category | null = null

  addOrUpdateText: string = ADD

  sub1: Subscription
  sub3: Subscription



  constructor(private shopService: ShopService) {
    this.sub1 = shopService.$selectedCategory.subscribe(
      category =>  {
        if (category) {
          this.category = category
          this.addOrUpdateText = UPDATE
        }
        else
          this.addOrUpdateText = ADD
      }
    )
    this.sub3 = shopService.$selectedCategory.subscribe(
      selectedCategory => this.selectedCategory = selectedCategory
    )
  }




  ngOnDestroy(): void {
      this.sub1.unsubscribe
  }

  onClickCancel() {
    this.shopService.$selectedCategory.next(null)
    this.shopService.$showCategoryForm.next(false)
  }


  onSubmit() {
    console.log(this.category)
      if (!this.shopService.$selectedCategory.getValue()) {
        console.log("tryaddCategory function")
        this.shopService.tryAddCategory(this.category)
      }
      else{
        console.log("try update Category function")
        this.shopService.tryUpdateCategory(this.category)}
  }
  
}


