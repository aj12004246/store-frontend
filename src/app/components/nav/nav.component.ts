import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { Component, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/data/Product';
import { RegisterServicesService } from 'src/app/services/register-services.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy{
  itemsInCart: number = 0

  constructor(private shopService: ShopService, private regService: RegisterServicesService, private cart: CartService) {
    cart.$myCart.subscribe(
      cart => {
        this.itemsInCart = 0
        cart.items.forEach(i =>{
          this.itemsInCart += i.quantity
        })
      }
    )
  }
  
  ngOnDestroy(): void {
    this.cart.$myCart.unsubscribe()
  }
  
  public showLogin():void {
    this.regService.showPage(this.regService.$showLogin, "login")
  }
  public showRegister():void {
    this.regService.showPage(this.regService.$showRegister, "register")
  }
  public showShop():void {
    this.regService.showPage(this.regService.$showShop, "shop")
  }
  public showAdmin():void {
    this.regService.showPage(this.regService.$showAdmin, "admin")
  }
  public showOrderHistory():void {
    this.cart.getCartById(this.regService.getaccId())
    this.cart.getOrderHistory(this.regService.getaccId())
    this.regService.showPage(this.regService.$showOrders, "orderhistory")
  }
  public showAccount(): void {
    this.regService.showPage(this.regService.$showAccount, "account")
  }
  public showShopKeep(): void {
    this.regService.showPage(this.regService.$showShopKeep, "shopkeep")
  }
  public showCart() {
    this.cart.getCartById(this.regService.getaccId())
    this.regService.showPage(this.regService.$showCart, "cart")
  }
  

  public getCurrPage():string {
    return this.regService.currShowing
  }

  public showRegButton():boolean {
    return this.getCurrPage() != 'register'&& this.getCurrPage() != 'shop' && !this.regService.isLoggedIn
  }

  public showLoginButton():boolean {
    return this.getCurrPage() != 'login' && !this.regService.isLoggedIn
  }

  public showAdminButton():boolean {
    return this.getCurrPage() != 'admin' && this.regService.getRole() === 'Admin'
  }

  public showOrderHistoryButton():boolean {
    return this.getCurrPage() != 'orderhistory' && this.regService.isLoggedIn
  }

  public showAccountButton():boolean {
    return this.getCurrPage() != 'account' && this.regService.isLoggedIn && this.regService.getRole() != 'Admin'
  }

  public showYourAccountButton():boolean {
    let role = this.regService.getRole()
    return this.regService.isLoggedIn && role === 'Customer'
  }

  public showShopKeepButton(): boolean {
    return (this.getCurrPage() != 'shopkeep' && this.regService.getRole() === 'ShopKeeper')
  }

  public showCartButton(): any {
    let role = this.regService.getRole()
    return this.getCurrPage() != 'cart' && !this.isAdminOrShopKeeper()
  }
  
  public logout(): void {
    this.regService.Logout()
  }

  public isAdminOrShopKeeper(): boolean {
    if(this.regService.getRole() === 'Admin' || this.regService.getRole() === 'ShopKeeper'){
      return true
    }
    return false
  }

  public showAdminText(): boolean {
    return this.regService.getRole() === 'Admin'
  }

  public showShopKeeperText(): boolean {
    return this.regService.getRole() === 'ShopKeeper'
  }
}
