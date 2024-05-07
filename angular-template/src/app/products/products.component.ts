import { Component } from '@angular/core'; 
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
 products:  any[] = [];
 searchText: string = '';
 filteredProducts: any[] = [];


  constructor(private _productsService: ProductsService, private router: Router, private location: Location) { 
    this.get_products();

  }
  Out(): void{
    this.location.back();
    localStorage.clear();
  };
  

  get_products(): void {
    this._productsService.products().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.products;
        this.filteredProducts = this.products; // Inicializar los productos filtrados con todos los productos al inicio
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      }
    });
  }
  sortByLowestCost(): void {
    this._productsService.productsByLowestCost().subscribe({
      next: (res) => {
        console.log(res);
        this.products= res.products;// Actualizar el arreglo de productos filtrados con el nuevo orden
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      }
    });
  }

  sortByHighestCost(): void {
    this._productsService.productsByHighestCost().subscribe({
      next: (res) => {
        console.log(res);
        this.products= res.products; // Actualizar el arreglo de productos filtrados con el nuevo orden
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      }
    });
  }
}