import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Category } from '../data/Category';
import { Coupon } from '../data/Coupon';
import { Product } from '../data/Product';
import { Sale } from '../data/Sale';
import { ScheduledPrice } from '../data/ScheculedPrice';
import { AlertErrorService } from './alert-error.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  $priceChanges = new BehaviorSubject<ScheduledPrice[]>([])
  $products = new BehaviorSubject<Product[]>([])
  $selectedProduct = new BehaviorSubject<Product | null>(null)
  $selectedSale = new BehaviorSubject<Sale | null>(null)
  $selectedScheduledPrice = new BehaviorSubject<ScheduledPrice | null>(null)
  $sales = new BehaviorSubject<Sale[]>([])
  $selectedCoupon = new BehaviorSubject<Coupon | null>(null)
  $coupons = new BehaviorSubject<Coupon[]>([])
  $selectedCategory = new BehaviorSubject<Category | null>(null)
  $categories = new BehaviorSubject<Category[]>([])

  $showExpandedProduct = new BehaviorSubject<boolean>(false)
  $showPriceForm = new BehaviorSubject<boolean>(false)
  $showProductForm = new BehaviorSubject<boolean>(false)
  $showSaleForm = new BehaviorSubject<boolean>(false)
  $showCouponForm = new BehaviorSubject<boolean>(false)
  $showCategoryForm = new BehaviorSubject<boolean>(false)

  dummyProducts : Product[] = [
    {
      availableOn: new Date,
      categories: [],
      description: "This thing is soooo coool!",
      discontinued: false,
      displayName: "Cool New Thing",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      map: 1,
      numInStock: 25,
      onSale: false,
      price: 225.99,
      priceChanges: [],
      productName: "cool_thing_222",
      quantityAtCost: 2,
      salePrice: 199.40,
      sales: []
    },{
      availableOn: new Date,
      categories: [],
      description: "This thing is even coooler!",
      discontinued: false,
      displayName: "Cool New Thing 2",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      map: 1,
      numInStock: 7,
      onSale: false,
      price: 500.12,
      priceChanges: [],
      productName: "cool_thing_24522",
      quantityAtCost: 20,
      salePrice: 480.00,
      sales: []
    },{
      availableOn: new Date,
      categories: [],
      description: "This thing is the coolest!",
      discontinued: false,
      displayName: "Cool New Thing 3",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      map: 1,
      numInStock: 2,
      onSale: true,
      price: 1054.35,
      priceChanges: [],
      productName: "cool_thing_3422",
      quantityAtCost: 208,
      salePrice: 759.33,
      sales: []
    }
  ]

  dummySales: Sale[] = [
    {
      startDate: new Date(),
      endDate: new Date(),
      salePrice: 0,
      percentageOff: 0.50,
      productId: 1,
      productName: "prod1"
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      salePrice: 0,
      percentageOff: 0.25,
      productId: 2,
      productName: "prod2"
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      salePrice: 0,
      percentageOff: 0.5,
      productId: 3,
      productName: "prod3"
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      salePrice: 0,
      percentageOff: 0.73,
      productId: 1,
      productName: "prod1"
    }
  ]

  dummyPrices: ScheduledPrice[] = [
    {
      startDate: new Date(),
      price: 0.53,
      productId: 1,
      productName: "prod1",
      isMap: true,
      isApplied: false
    },
    {
      startDate: new Date(),
      price: 324.88,
      productId: 2,
      productName: "thing2",
      isMap: false,
      isApplied: false
    },
    {
      startDate: new Date(),
      price: 1000.12,
      productId: 3,
      productName: "item3",
      isMap: true,
      isApplied: false
    },
    {
      startDate: new Date(),
      price: 25.99,
      productId: 1,
      productName: "prod1",
      isMap: false,
      isApplied: false
    }
  ]

  dummyCoupons: Coupon[] = [
   {
      code: 'PROMO',
      startDate: new Date,
      endDate: new Date,
      useLimit: 100,
      amountOff: 50,
      percentageOff: 50,
      id: 1
    },
    {
      code: 'FIFTYFIFTY',
      startDate: new Date,
      endDate: new Date,
      useLimit: 100,
      amountOff: 50,
      percentageOff: 50,
      id: 2
    },
    {
      code: 'BOGO',
      startDate: new Date,
      endDate: new Date,
      useLimit: 100,
      amountOff: 50,
      percentageOff: 50,
      id: 3
    }
  ]

  constructor(private snackBar: AlertErrorService, private http: HttpService) {
    this.refreshProducts()
    this.refreshSales()
    this.refreshPriceChanges()
    this.refreshCoupons()
    this.refreshCategories()
   }

  //product
  refreshProducts() {
    this.http.getProducts().pipe(take(1)).subscribe({
      next: (products) => {
        if (products.length === 0) {
          for(let product of this.dummyProducts)
            this.tryAddProduct(product)
        }
        else
          this.$products.next(products)
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryAddProduct(productToAdd: Product) {
    this.http.addProduct(productToAdd).pipe(take(1)).subscribe({
      next: (newProduct) => {
        this.$products.next([...this.$products.getValue(), newProduct])
        this.$showProductForm.next(false)
        this.refreshProducts()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryDeleteProduct(id: number) {
    this.http.deleteProduct(id).pipe(take(1)).subscribe({
      next: () => {
        this.$products.next([...this.$products.getValue().filter(p => p.id !== id)])
        this.$showExpandedProduct.next(false)
        this.refreshProducts()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryUpdateProduct(productToUpdate: Product) {
    this.http.updateProduct(productToUpdate).subscribe({
      next: (updatedProduct) => {
        this.$showProductForm.next(false)
        this.refreshProducts()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  setSelectedProductById(productId: number) {
    const prod = this.$products.getValue().find(p => p.id === productId)
    if (prod)
      this.$selectedProduct.next(prod)
  }

  public ValidateProduct(product : Product): boolean {
    const {productName,displayName,description,img,price,map,quantityAtCost} = product

     if (productName == '' || productName == null) {
      this.snackBar.showError('Product Name Required!')
      return false
    }
     if (displayName == '' || displayName == null) {
      this.snackBar.showError('Display Name Required!')
      return false
    }
    if (img == '' ||img == null) {
      this.snackBar.showError('Image URL Required!')
      return false
    }
     if (price == 0 || price == null) {
      this.snackBar.showError('Price Required!')
      return false
    }
     if(map==0 ||map== null)
    {
      this.snackBar.showError('MAP Required!')
      return false
    }
     if(quantityAtCost==0 || quantityAtCost== null || quantityAtCost==undefined)
    {
      this.snackBar.showError('Quantity at Cost Required!')
      return false
    }
    if (description == '' || description == null) {
      this.snackBar.showError('Description Required!')
      return false
    }
    return true
  }

  //sale
  refreshSales() {
    this.http.getSales().pipe(take(1)).subscribe({
      next: (sales) => {
        if (sales.length === 0) {
          for(let sale of this.dummySales)
            this.tryAddSale(sale)
        }
        else{
          this.$sales.next(sales)
        }
        this.refreshProducts()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryAddSale(saleToAdd: Sale) {
    this.http.addSale(saleToAdd).pipe(take(1)).subscribe({
      next: () => {
        this.$sales.next([...this.$sales.getValue(), saleToAdd])
        this.$showSaleForm.next(false)
        this.refreshSales()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryDeleteSale(id: number) {
    this.http.deleteSale(id).pipe(take(1)).subscribe({
      next: () => {
        this.$sales.next([...this.$sales.getValue().filter(s => s.id !== id)])
        this.refreshSales()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryUpdateSale(saleToUpdate: Sale) {
    this.http.updateSale(saleToUpdate).subscribe({
      next: (updatedSale) => {
        this.$showSaleForm.next(false)
        this.refreshSales()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  validateSaleInput(sale: Sale): boolean {
    if (sale.salePrice <= 0) {
      this.snackBar.showError("Sale price must be greater than 0")
      return false
    }
    if (!sale.productName || !sale.productId) {
      this.snackBar.showError("Sale must be applied to a valid product")
      return false
    }
    if (sale.percentageOff < 0 || sale.percentageOff > 100) {
      this.snackBar.showError("Invalid percentage. Must be an integer 1 - 100")
      return false
    }
    return true
  }

  //price change
  refreshPriceChanges() {
    this.http.getPriceChanges().pipe(take(1)).subscribe({
      next: (priceChanges) => {
        if (priceChanges.length === 0) {
          for(let price of this.dummyPrices)
            this.tryAddPriceChange(price)

        }
        else{
          this.$priceChanges.next(priceChanges)
        }
        this.refreshProducts()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryAddPriceChange(priceToAdd: ScheduledPrice) {
    this.http.addPriceChange(priceToAdd).pipe(take(1)).subscribe({
      next: (newPriceChange) => {
        this.$priceChanges.next([...this.$priceChanges.getValue(), newPriceChange])
        this.$showPriceForm.next(false)
        this.refreshPriceChanges()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryDeletePriceChange(id: number) {
    this.http.deletePriceChange(id).pipe(take(1)).subscribe({
      next: () => {
        this.$priceChanges.next([...this.$priceChanges.getValue().filter(pc => pc.id !== id)])
        this.refreshPriceChanges()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  tryUpdatePriceChange(priceChangeToUpdate: ScheduledPrice) {
    this.http.updatePriceChange(priceChangeToUpdate).subscribe({
      next: (updatedPriceChange) => {
        this.$showPriceForm.next(false)
        this.refreshPriceChanges()
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  validatePriceChangeInput(priceChange: ScheduledPrice): boolean {
    if (priceChange.price <= 0) {
      this.snackBar.showError("New price must be greater than 0")
      return false
    }
    if (!priceChange.productName || !priceChange.productId) {
      this.snackBar.showError("Price change must be applied to a valid product")
      return false
    }
    return true
  }




  validateCouponInput(coupon: Coupon): boolean {
    if (coupon.code === '' || coupon.code === null) {
      this.snackBar.showError("Coupon code name cannot be blank!")
      return false
    }
    if (coupon.useLimit <= 0) {
      this.snackBar.showError("Limit of uses must be greater than 0")
      return false
    }
    if (coupon.amountOff <= 0 && coupon.percentageOff <= 0) {
      this.snackBar.showError("Must have valid percantage/amoung off")
      return false
    }
    if (coupon.percentageOff < 0 || coupon.percentageOff > 100) {
      this.snackBar.showError("Invalid percentage. Must be an integer 1 - 100")
      return false
    }
    return true
  }


  refreshCoupons() {
    this.http.getCoupons().pipe(take(1)).subscribe({
      next: (coupons) => {
        this.$coupons.next(coupons)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }



  tryAddCoupon(couponToAdd: Coupon) {
    this.http.addCoupon(couponToAdd).pipe(take(1)).subscribe({
      next: (newCoupon) => {
        this.$coupons.next([...this.$coupons.getValue(), newCoupon])
        this.snackBar.showError('Coupon added successfully!')
        this.$showCouponForm.next(false)
      },
      error: (err) => {
        this.snackBar.showError('Coupon Code Exists!')
        console.error(err)
      }
    })
  }

  tryDeleteCoupon(id: number) {
    console.log(id)
    this.http.deleteCoupon(id).pipe(take(1)).subscribe({
      next: () => {
        this.$coupons.next([...this.$coupons.getValue().filter(c => c.id !== id)])
        this.snackBar.showError('Coupon deleted successfully!')
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  tryUpdateCoupon(couponToUpdate: Coupon) {
    this.http.updateCoupon(couponToUpdate).subscribe({
      next: (updatedCoupon) => {
        this.$showCouponForm.next(false)
        this.snackBar.showError('Coupon updated!')
      },
      error: (err) => {
        console.error(err)
      }
    })
  }



  //Categories


  refreshCategories() {
    this.http.getCategories().pipe(take(1)).subscribe({
      next: (categories) => {
        this.$categories.next(categories)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }



  tryAddCategory(categoryToAdd: Category) {
    this.http.addCategory(categoryToAdd).pipe(take(1)).subscribe({
      next: (newCategory) => {
        this.$categories.next(newCategory);
        this.snackBar.showError('Category added successfully!')
        this.$showCategoryForm.next(false)
      },
      error: (err) => {
        this.snackBar.showError(err.error)
      }
    })
  }



  tryDeleteCategory(id: number) {
    this.http.deleteCategory(id).pipe(take(1)).subscribe({
      next: () => {
        this.$categories.next([...this.$categories.getValue().filter(c => c.id !== id)])
        this.snackBar.showError('Category deleted successfully!')
      },
      error: (err) => {
        console.error(err)
        this.snackBar.showError('Something went wrong.')
      }
    })
  }

  tryUpdateCategory(categoryToUpdate: Category) {
    this.http.updateCategory(categoryToUpdate).subscribe({
      next: (updatedCategory) => {
        this.$showCategoryForm.next(false)
        this.snackBar.showError('Category updated!')
      },
      error: (err) => {
        this.snackBar.showError('Category already exists!')
        console.error(err)
      }
    })
  }

}
