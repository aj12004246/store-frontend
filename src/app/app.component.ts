import { Component } from '@angular/core';
import { RegisterServicesService } from './services/register-services.service';
import { Subscription } from 'rxjs';
import { ShopService } from './services/shop.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showExpandedProduct: boolean = false
  showProductForm: boolean = false
  showRegister: boolean = false
  showLogin: boolean = false
  showProducts: boolean = false
  showShop: boolean = false
  showAdmin: boolean = false
  showOrders: boolean = false
  showAccount: boolean = false
  showShopKeep: boolean = false
  showCart: boolean = false

  sub1: Subscription
  sub2: Subscription
  showLoginSub: Subscription
  showRegisterSub: Subscription
  showProductsSub: Subscription
  showShopSub: Subscription
  showAdminSub: Subscription
  showOrdersSub: Subscription
  showAccountSub: Subscription
  showShopKeepSub: Subscription
  showCartSub: Subscription

  constructor(private shopService: ShopService, private ui: RegisterServicesService) {
    this.sub1 = shopService.$showProductForm.subscribe(
      showProductForm => this.showProductForm = showProductForm
    )
    this.sub2 = shopService.$showExpandedProduct.subscribe(
      showExpandedProduct => this.showExpandedProduct = showExpandedProduct
    )
    this.showLoginSub = ui.$showLogin.subscribe(
      show => this.showLogin = show
    )
    this.showRegisterSub = ui.$showRegister.subscribe(
      show => this.showRegister = show
    )
    this.showProductsSub = ui.$showProducts.subscribe(
      show => this.showProducts = show
    )
    this.showShopSub = ui.$showShop.subscribe(
      show => this.showShop = show
    )
    this.showAdminSub = ui.$showAdmin.subscribe(
      show => this.showAdmin = show
    )
    this.showOrdersSub = ui.$showOrders.subscribe(
      show => this.showOrders = show
    )
    this.showAccountSub = ui.$showAccount.subscribe(
      show => this.showAccount = show
    )
    this.showShopKeepSub = ui.$showShopKeep.subscribe(
      show => this.showShopKeep = show
    )
    this.showCartSub = ui.$showCart.subscribe(
      show => this.showCart = show
    )
  }



}
