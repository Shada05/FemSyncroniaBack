import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) { }

  product(id:number): Observable<any> {
    return this.http.get('http://localhost:3000/products/'+id); //Se redirige al login
  }

}