import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/data/Product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = []
  showProductForm: boolean = false
  sub1: Subscription
  sub2: Subscription

  constructor(private shopService: ShopService) {
    this.sub1 = shopService.$products.subscribe(
      products => this.products = products
    )
    this.sub2 = shopService.$showProductForm.subscribe(
      showProductForm => this.showProductForm = showProductForm
    )
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  onClickAdd() {
    this.shopService.$selectedProduct.next(null)
    this.shopService.$showProductForm.next(true)
  }

}
