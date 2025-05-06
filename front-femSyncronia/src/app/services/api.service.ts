import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL base de tu API

  private cicloActualizadoSource = new Subject<void>();

  constructor(private http: HttpClient) {}

  createUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/users`, data);
  }

  createCiclo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/cycle_calendar`, data);
  }
  updateUsuario(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/v1/users/${id}`, data);
  }

  mostrarUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/users/${id}`);
  }

  updateCycles(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/v1/cycles/${id}`, data);
  }

  mostrarCicloCalendario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/cycle_calendar_id/${id}`);
  }

  mostrarCiclo(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cycles_tables_id/${user_id}`);
  }

  crearCiclo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/cycles`, data);
  }

  eliminarCicloPorMesYAnio(user_id: string, year: number, month: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/v1/cycle_calendar/user/${user_id}/${year}/${month}`);
  }  
  
  eliminarRegistroEnciclo(user_id: string, year: number, month: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/v1/cycles/user_cycles/${user_id}/${year}/${month}`);
  }

  uploadImage(formData: FormData): Observable<{ imageUrl: string }> {
    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/upload`,
      formData
    );
  }

  obtenerSintomas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/symptoms`);
  }

  cicloActualizado$ = this.cicloActualizadoSource.asObservable();

  notificarActualizacion() {
    this.cicloActualizadoSource.next();
  }
}
