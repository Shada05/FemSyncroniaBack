import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl = 'https://femsyncronia.onrender.com'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para enviar el código de verificación
  enviarCodigo(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-codigo`, { email });
  }

  // Método para validar el código ingresado
  validarCodigo(email: string, codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validar-codigo`, { email, codigo });
  }
}
