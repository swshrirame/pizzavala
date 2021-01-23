  import { CartService } from './../cart.service';
  import { ProductService } from './../product.service';
  import { Component, OnInit } from '@angular/core';
  import { CategoryService } from '../category.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
  })
  export class GalleryComponent implements OnInit {
    categories = []
    products = []
    text=''
    category = 0
    searchedPizz=[]
    constructor(
      private router: Router,
      private cartService: CartService,
      private productService: ProductService,
      private toastr: ToastrService,
      private categoryService: CategoryService) { }

    ngOnInit(): void {
      this.loadCategories()

      this.filterProducts()
    }

    filterProducts() {
      this.productService
        .filterProducts(this.category)
        .subscribe(response => {
          console.log(response)
          if (response['status'] == 'success') {
            this.products = response['data']
          } else {
            this.toastr.error(response['error'])
          }
        })
    }

    loadCategories() {
      this.categoryService
        .getCategories()
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.categories = response['data']
          } else {
            this.toastr.error(response['error'])
          }
        })
    }

    onAddToCart(product) {
      this.cartService
        .addItemToCart(product.id, product.price, 1)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.toastr.success('successfully added item to cart')
          } else {
            this.toastr.error(response['error'])
          }
        })
    }

    showProductDetails(product) {
      this.router.navigate(['/home/product/product-info'], {queryParams: { id: product.id }})
    }
     
    DoSearch(){
      console.log(this.text)
      this.productService.searchProducts(this.text).subscribe(response=>{
        if(response['status']=='success')
        {
          this.products=response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
    }
  }
