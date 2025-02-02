import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // URL de tu API

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  // Método para verificar si el token es válido
  verificarToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/verificar-token`, { headers });
  }

  //Método para guardar el token
  async guardarToken(token: string) {
    return await this.storage.set('authToken', token);
  }

  //Método para obtener el token
  async obtenerToken(): Promise <string | null> {
    return await this.storage.get('authToken');
  }
  
  // Método de login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
}