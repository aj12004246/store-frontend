import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/data/Product';
import { ShopService } from 'src/app/services/shop.service';

interface shopItems{
  name:string,
  price:number,
  description:string,
  img:string,
  discount:number,
  categories:string[]
  }
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products: Product[] = []
  filteredProducts: Product[] = []
  shopTextSearch='';

filterSearch():void  {
  this.filteredProducts= 
  this.shopTextSearch.length>0 
  ? 
  this.filteredProducts.filter(el =>el.displayName.toLowerCase().includes(this.shopTextSearch.toLowerCase()))
  : this.products;
}

constructor(private shopService: ShopService, public cart: CartService) {
  shopService.$products.subscribe(products => {
    this.products = products
    this.filteredProducts = products  
  })
}

};

