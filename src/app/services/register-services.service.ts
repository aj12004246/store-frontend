import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, take } from 'rxjs';
import { Account } from '../data/Account';
import { AlertErrorService } from './alert-error.service';
import { ShopService } from './shop.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterServicesService {


  $showLogin = new BehaviorSubject<boolean>(false)
  $showRegister = new BehaviorSubject<boolean>(false)
  $showProducts = new BehaviorSubject<boolean>(false)
  $showShop = new BehaviorSubject<boolean>(true)
  $showAdmin = new BehaviorSubject<boolean>(false)
  $showOrders = new BehaviorSubject<boolean>(false)
  $showAccount = new BehaviorSubject<boolean>(false)
  $showShopKeep = new BehaviorSubject<boolean>(false)
  $showCart = new BehaviorSubject<boolean>(false)
  $isLoggedIn = new BehaviorSubject<boolean>(false)

  public show = [this.$showProducts,
  this.$showLogin,
  this.$showRegister,
  this.$showShop,
  this.$showAdmin,
  this.$showOrders,
  this.$showAccount,
  this.$showShopKeep,
  this.shopService.$showExpandedProduct,
  this.shopService.$showPriceForm,
  this.shopService.$showProductForm,
  this.shopService.$showSaleForm,
  this.$showCart
  ]
  public currShowing: string = 'shop'
  public isLoggedIn = false
  //private showRegister =false
  //private showLogin=true
  private accountId = 0
  private userRole: string = ''
  private userEmail: string = ''
  private pathurl = 'https://localhost:7225/api/'

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private erroralert: AlertErrorService,
    private shopService: ShopService) {
    // const username=localStorage.getItem('username')
  }
  public getaccId(): number {
    return this.accountId
  }
  public getEmail(): string {
    return this.userEmail
  }
  public getRole(): string {
    return this.userRole
  }
  public setEmail(email: string): void {
    this.userEmail = email
  }
  public validateEmail(checkEmail: string){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(checkEmail); 
  } 

  public ValidateRegister(email: string, password: string, accounttype: string): void {
    if (email == '' || email == null) {
      this.erroralert.showError('Email Required')
      return
    }
    if (password == '' || password == null) {
      this.erroralert.showError('Password Required')
      return
    }
    if (accounttype == '' || accounttype == null) {
      this.erroralert.showError('Choose an Account Type')
      return
    }
    if (this.validateEmail(email) === false){
      this.erroralert.showError('Email does not meet requirements Ex: Example@example.com')
      return
    }

    this.SubmitRegister(email, password, accounttype)
  }
  private SubmitRegister(Email: string, Password: string, Role: string): void {
    this.http.post(this.pathurl + `Account`,
      {
        Password,
        Email,
        Role,
        Carts: []
      }
    )
      .pipe(take(1))
      .subscribe({
        next: () => {

          this.erroralert.showError('Registered Successfully! Please Login!')
          this.$showLogin.next(true)
          this.$showRegister.next(false)

        },
        error: (err) => {
          if (err.status === 409) {
            this.erroralert.showError('Email already exists !')
          }
        }
      })
  }
  public ValidateLogin(email: string, password: string): void {
    if (email == '' || email == null) {
      this.erroralert.showError('Enter Email')
      return
    }
    if (password == '' || password == null) {
      this.erroralert.showError('Enter Password')
      return
    }
    this.SubmitLogin(email, password)
  }

  private SubmitLogin(email: string, password: string): void {
    this.http.get<Account>(this.pathurl + `Account/${email}/${password}`)
      .pipe(take(1))
      .subscribe({
        next: acc => {
          this.userRole = acc.role
          console.log(this.userRole)
          this.userEmail = acc.email
          this.accountId = acc.id
          this.LoginSuccess()
        },
        error: err => {
          this.erroralert.showError("Email or Password Incorrect !")
        }
      })
  }
  private LoginSuccess(): void {
    this.snackBar.dismiss()
    if (this.userRole === "Admin")
      this.showPage(this.$showAdmin, 'admin')
    else if (this.userRole === "ShopKeeper")
      this.showPage(this.$showShopKeep, 'shopkeep')
    else
      this.showPage(this.$showShop, 'shop')

    this.isLoggedIn = true
    this.$isLoggedIn.next(true)
  }

  public Logout(): void {
    this.$showLogin.next(false)
    this.userRole = ''
    this.userEmail = ''
    this.accountId = 0
    this.isLoggedIn = false
    this.$isLoggedIn.next(false)
    this.showPage(this.$showShop, 'shop')
  }

  public getUsername(): string | undefined {
    return this.userEmail
  }

  public showPage(pageToShow: BehaviorSubject<boolean>, page: string): void {
    this.show.forEach(showSubject => {
      if (pageToShow === showSubject) {
        showSubject.next(true)
        this.currShowing = page
      }
      else {
        showSubject.next(false)
      }
    });
  }
}
