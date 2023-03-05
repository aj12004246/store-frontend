import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/data/Product';
import { ShopService } from 'src/app/services/shop.service';

const CREATE: string = "Create"
const UPDATE: string = "Update"

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent implements OnDestroy {

  product: Product = {
    availableOn: new Date,
    categories: [],
    description: "",
    discontinued: false,
    displayName: "",
    id: 17, 
    img: "", 
    map: 0, 
    numInStock: 0,
    onSale: false, 
    price: 0,
    priceChanges: [], 
    productName: "", 
    quantityAtCost: 0,
    salePrice: 0, 
    sales: []
  }

  minDate = new Date();

  createOrUpdateText: string = CREATE

  sub1: Subscription

  constructor(public shopService: ShopService) {
    
    this.sub1 = shopService.$selectedProduct.subscribe(
      selectedProduct => {
        if (selectedProduct) {
          this.product = selectedProduct
          this.createOrUpdateText = UPDATE
        }
        else
          this.createOrUpdateText = CREATE
      }
    )

  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe
  }

  onClickCancel() {
    this.shopService.$selectedProduct.next(null)
    console.log("Cancelled")
    //Todo handle rendering on cancel
    this.shopService.$showProductForm.next(false)
  }

  onSubmit() {
    if(this.shopService.ValidateProduct(this.product))
    {
      if (!this.shopService.$selectedProduct.getValue()) {
        delete this.product.id
        this.shopService.tryAddProduct(this.product)
      }
      else{
        this.shopService.tryUpdateProduct(this.product)}
  }
  
}


}
