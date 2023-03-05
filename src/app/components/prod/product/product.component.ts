import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/data/Product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnDestroy {
  product: Product = {
    availableOn: new Date,
    categories: [],
    description: "",
    discontinued: false,
    displayName: "",
    id: 1,
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

  sub1: Subscription

  constructor(private shopService: ShopService) {
    this.sub1 = shopService.$selectedProduct.subscribe(
      selectedProduct =>  {
        if (selectedProduct)
          this.product = selectedProduct
      })
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe
  }

  onClickDelete() {
    if (this.product.id) 
      this.shopService.tryDeleteProduct(this.product.id)
  }

  onClickEdit() {
    this.shopService.$selectedProduct.next(this.product)
    this.shopService.$showExpandedProduct.next(false)
    this.shopService.$showProductForm.next(true)
  }

}
