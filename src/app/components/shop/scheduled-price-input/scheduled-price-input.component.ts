import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/data/Product';
import { ScheduledPrice } from 'src/app/data/ScheculedPrice';
import { AlertErrorService } from 'src/app/services/alert-error.service';
import { ShopService } from 'src/app/services/shop.service';

const ADD: string = "Add"
const UPDATE: string = "Update"

@Component({
  selector: 'app-scheduled-price-input',
  templateUrl: './scheduled-price-input.component.html',
  styleUrls: ['./scheduled-price-input.component.css']
})
export class ScheduledPriceInputComponent {
  products: Product[] = []
  scheduledPrice: ScheduledPrice = {
    id: 1,
    startDate: new Date(),
    price: 0,
    productId: 1,
    productName: "",
    isMap: false,
    isApplied: false
  }
  selectedProduct: Product | null = null
  minDate: Date = new Date()
  addOrUpdateText: string = ADD

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private snackbar: AlertErrorService, private shopService: ShopService) {
    this.sub1 = shopService.$selectedScheduledPrice.subscribe(
      selectedScheduledPrice =>  {
        if (selectedScheduledPrice) {
          this.scheduledPrice = selectedScheduledPrice
          this.addOrUpdateText = UPDATE
        }
        else
          this.addOrUpdateText = ADD
      }
    )
    this.sub2 = shopService.$products.subscribe(
      products => this.products = products
    )
    this.sub3 = shopService.$selectedProduct.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    )
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe
      this.sub2.unsubscribe
      this.sub3.unsubscribe
  }

  onClickCancel() {
    this.shopService.$selectedScheduledPrice.next(null)
    this.shopService.$showPriceForm.next(false)
  }

  onSubmit() {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.scheduledPrice.productId = this.selectedProduct.id
      this.scheduledPrice.productName = this.selectedProduct.productName
    }

    if (this.shopService.validatePriceChangeInput(this.scheduledPrice)) {
      if (this.shopService.$selectedScheduledPrice.getValue()) {
        this.shopService.tryUpdatePriceChange(this.scheduledPrice)
      }
      else {
        let scheduledPriceToAdd = this.scheduledPrice
        delete scheduledPriceToAdd.id
        this.shopService.tryAddPriceChange(scheduledPriceToAdd)
      }
    }
  }
}