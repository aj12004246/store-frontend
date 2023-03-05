import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../data/Product';
import { Coupon } from '../data/Coupon';
import { Sale } from '../data/Sale';
import { ScheduledPrice } from '../data/ScheculedPrice';
import { Category } from '../data/Category';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //Product
  getProducts() {
    return this.http.get<Product[]>("https://localhost:7225/api/products")
  }

  addProduct(newProduct: Product) {
    return this.http.post<Product>("https://localhost:7225/api/products", newProduct)
  }

  updateProduct(updatedProduct: Product) {
    return this.http.put<Product>(`https://localhost:7225/api/products/${updatedProduct.id}`, updatedProduct)
  }

  deleteProduct(id: number) {
    return this.http.delete(`https://localhost:7225/api/products/${id}`)
  }

  //Sales
  getSales() {
    return this.http.get<Sale[]>("https://localhost:7225/api/sale")
  }

  addSale(newSale: Sale) {
    return this.http.post<Sale>("https://localhost:7225/api/sale", newSale)
  }

  updateSale(updatedSale: Sale) {
    return this.http.put<Sale>(`https://localhost:7225/api/sale/${updatedSale.id}`, updatedSale)
  }

  deleteSale(id: number) {
    return this.http.delete(`https://localhost:7225/api/sale/?id=${id}`)
  }

  //Price Change
  getPriceChanges() {
    return this.http.get<ScheduledPrice[]>("https://localhost:7225/api/pricechanges")
  }

  addPriceChange(newPrice: ScheduledPrice) {
    return this.http.post<ScheduledPrice>("https://localhost:7225/api/pricechanges", newPrice)
  }

  updatePriceChange(updatedPriceChange: ScheduledPrice) {
    return this.http.put<ScheduledPrice>(`https://localhost:7225/api/pricechanges/${updatedPriceChange.id}`, updatedPriceChange)
  }

  deletePriceChange(id: number) {
    return this.http.delete(`https://localhost:7225/api/pricechanges/${id}`)
  }

  /*  BEGIN COUPON SECTION  */
  getCoupons() {
    return this.http.get<Coupon[]>("https://localhost:7225/api/Coupon")
  }

  getCouponById(id: number){
    return this.http.get<Coupon>(`https://localhost:7225/api/Coupon/${id}`)
  }

  getCouponByCode(code: string){
    return this.http.get<Coupon>(`https://localhost:7225/api/Coupon/${code}`)
  }

  addCoupon(newCoupon: Coupon) {
    return this.http.post<Coupon>("https://localhost:7225/api/Coupon", newCoupon)
  }

  updateCoupon(updatedCoupon: Coupon) {
    return this.http.put<Coupon>(`https://localhost:7225/api/Coupon/${updatedCoupon.id}`, updatedCoupon)
  }

  deleteCoupon(id: number) {
    return this.http.delete(`https://localhost:7225/api/Coupon/${id}`)
  }

  /* BEGIN CATEGORY SECTION */

  getCategories() {
    return this.http.get<Category[]>("https://localhost:7225/api/Category")
  }

  getCategoryById(id: number){
    return this.http.get<Coupon>(`https://localhost:7225/api/Coupon/${id}`)
  }

  getCategoryByName(name: string){
    return this.http.get<Coupon>(`https://localhost:7225/api/Coupon/${name}`)
  }

  addCategory(newCategory: Category) {
    return this.http.post<Category[]>("https://localhost:7225/api/Category", newCategory)
  }

  updateCategory(updatedCategory: Category) {
    return this.http.put<Category>(`https://localhost:7225/api/Category/${updatedCategory.id}`, updatedCategory)
  }

  deleteCategory(id: number) {
    return this.http.delete(`https://localhost:7225/api/Category/${id}`)
  }

}// end of class
