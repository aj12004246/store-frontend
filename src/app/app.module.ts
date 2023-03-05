import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from   '@angular/common/http'
import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/prod/product/product.component';
import { ProductsComponent } from './components/prod/products/products.component';
import { ProductInputComponent } from './components/prod/product-input/product-input.component';
import { ProductListItemComponent } from './components/prod/product-list-item/product-list-item.component';
import { ScheduledPriceInputComponent } from './components/shop/scheduled-price-input/scheduled-price-input.component';
import { PriceChangeTableComponent } from './components/shop/price-change-table/price-change-table.component';
import { SaleTableComponent } from './components/shop/sale-table/sale-table.component';
import { SaleInputComponent } from './components/shop/sale-input/sale-input.component';
import { AdminComponent } from './components/admin-view/admin/admin.component';
import { CreateAccountComponent } from "./components/admin-view/create-account/create-account.component";
import { AccountComponent } from "./components/admin-view/account/account.component";
import { EditAccountComponent } from "./components/admin-view/edit-account/edit-account.component";
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ShopComponent } from './components/shop/shop/shop.component';
import { ShopkeeperViewComponent } from './components/shop/shopkeeper-view/shopkeeper-view.component';
import { SearchByComponent } from './components/search-by/search-by.component';
import { CustomerAccountComponent } from './components/customer-account/customer-account.component';
import { CartComponent } from './cart/cart.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';


import { NavComponent } from './components/nav/nav.component';
import { CouponsTableComponent } from './components/shop/coupons-table/coupons-table.component';
import { CouponsInputComponent } from './components/shop/coupons-input/coupons-input.component';
import { CategoriesViewComponent } from './components/categories-view/categories-view.component';
import { CategoriesInputComponent } from './components/categories-view/categories-input/categories-input.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProductComponent,
    ProductsComponent,
    ProductInputComponent,
    ProductListItemComponent,
    ScheduledPriceInputComponent,
    ProductListItemComponent,
    PriceChangeTableComponent,
    SaleTableComponent,
    SaleInputComponent,
    AdminComponent,
    CreateAccountComponent,
    AccountComponent,
    EditAccountComponent,
    ShopComponent,
    NavComponent,
    ShopkeeperViewComponent,
    SearchByComponent,
    CartComponent,
    CategoriesViewComponent,
    CustomerAccountComponent,
    OrderhistoryComponent,
    CouponsTableComponent,
    CouponsInputComponent,
    CategoriesInputComponent,
   ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatBadgeModule
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
