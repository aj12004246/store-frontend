import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/data/Product';
import { RegisterServicesService } from 'src/app/services/register-services.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product = {
    availableOn: new Date, 
    categories: [], 
    description: "", 
    discontinued: false, 
    displayName: "", 
    id: 1, 
    img: "", 
    map: 1, 
    numInStock: 1,
    onSale: false, 
    price: 1.00,
    priceChanges: [], 
    productName: "", 
    quantityAtCost: 1,
    salePrice: 0, 
    sales: []
  }
  role: string = "Customer"

  constructor(private regService:RegisterServicesService, public cart: CartService, private shopService:ShopService) {}

  ngOnInit(): void {
      this.role = this.regService.getRole()
  }

  onClickDelete() {
    if (this.product.id)
      this.shopService.tryDeleteProduct(this.product.id)
  }

  onClickAdd() {
    if (this.product.id) {
      this.cart.addToCart(this.product.id, this.regService.getaccId())
    }
    
  }

  onClickEdit() {
    this.shopService.$selectedProduct.next(this.product)
    this.shopService.$showProductForm.next(true)
  }

  showExpandedProduct() {
    this.shopService.$showExpandedProduct.next(true)
    this.shopService.$selectedProduct.next(this.product)
  }
}
