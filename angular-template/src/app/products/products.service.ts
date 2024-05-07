import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  constructor(private http: HttpClient) { }

  products(): Observable<any> {
    return this.http.get('http://localhost:3000/products'); //Se redirige al login
  }
  productsByLowestCost(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/products/lowestCost');
  }

  productsByHighestCost(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/products/highestCost');
  }
}