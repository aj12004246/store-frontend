import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/data/Product';
import { Sale } from 'src/app/data/Sale';
import { ShopService } from 'src/app/services/shop.service';

const ADD: string = "Add"
const UPDATE: string = "Update"

@Component({
  selector: 'app-sale-input',
  templateUrl: './sale-input.component.html',
  styleUrls: ['./sale-input.component.css']
})
export class SaleInputComponent {
  products: Product[] = []
  sale: Sale = {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
    salePrice: 0,
    percentageOff: 0,
    productId: 1,
    productName: ""
  }

  isPercentage: boolean = false
  minDate: Date = new Date()
  selectedProduct: Product | null = null

  addOrUpdateText: string = ADD

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private shopService: ShopService) {
    this.sub1 = shopService.$selectedSale.subscribe(
      sale =>  {
        if (sale) {
          this.sale = sale
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
  }

  onClickCancel() {
    this.shopService.$selectedSale.next(null)
    this.shopService.$showSaleForm.next(false)
  }

  updateSalePrice() {
    if (this.selectedProduct)
      this.sale.salePrice = this.selectedProduct?.price * (1 - this.sale.percentageOff / 100)
  }

  onSubmit() {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.sale.productId = this.selectedProduct.id
      this.sale.productName = this.selectedProduct.productName
    }

    if(this.shopService.validateSaleInput(this.sale)) {
      if (this.shopService.$selectedSale.getValue()) {
        this.shopService.tryUpdateSale(this.sale)
      }
      else {
        let saleToAdd = this.sale
        delete saleToAdd.id
        this.shopService.tryAddSale(saleToAdd)
      }
    }
  }
}
