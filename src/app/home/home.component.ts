import { Component,ViewChild } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor( private productsService: ProductService){}

  @ViewChild('paginator') paginator: Paginator | undefined;

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product){
    if (!product.id){
      return;
    }

    this.deleteProduct(product.id);
  }

  toggleAddPopup(){
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    price: '',
    name: '',
    image: '',
    rating: 0,
  }

  onConfirmEdit(product: Product){
    if(!this.selectedProduct.id){
      return;
    }
    // OR
    // this.editProduct(product, this.selectedProduct.id ?? 0);
    
    this.displayEditPopup = false
  }

  onConfirmAdd(product: Product){
    this.addProduct(product);
    this.displayAddPopup = false
  }

  products: Product[] = [];

  onProductOutput(product: Product){
    console.log(product, 'Output');
  }

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator(){
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number){
    this.productsService //caling our product service
    .getProducts('http://localhost:3000/clothes', {page, perPage}) //passing url and pagenationParms
    // .subscribe((products: Products) => { //subscribing/listening to the Observable. 
    //   // console.log(products.items) //Once sub goes through
    //   this.products = products.items;
    //   this.totalRecords = products.total;
    // });
    .subscribe({
      next: (data: Products) => { //200
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error) => { //400-500
        console.log(error);
      },
    })
  }

  editProduct(product: Product, id: number){
    console.log("Edit")
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (data) => { //200
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => { //400-500
          console.log(error);
        },
      }
    );
  }

  deleteProduct(id: number){
    console.log("Delete")
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe(
      {
        next: (data) => { //200
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => { //400-500
          console.log(error);
        },
      }
    );
  }

  addProduct(product: Product){
    console.log("Add")
    this.productsService.addProduct('http://localhost:3000/clothes', product).subscribe(
      {
        next: (data) => { //200
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => { //400-500
          console.log(error);
        },
      }
    );
  }

  //ran when component is loaded
  ngOnInit(){
    this.fetchProducts(0, this.rows);
  }
}
