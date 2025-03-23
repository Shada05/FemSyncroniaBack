import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {
  sintomas: any[] = [];
  sintomasPorTipo: { [key: number]: any[] } = {};
  sintomaSeleccionado: any = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.obtenerSintomas();
  }

  async obtenerSintomas() {
    try {
      const data = await lastValueFrom(this.apiService.obtenerSintomas());

      // Inicializar el objeto de síntomas por tipo
      this.sintomasPorTipo = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };

      // Mapear los síntomas y organizarlos por tipo
      this.sintomas = data.map((sintoma: any) => ({
        nombre: sintoma.name,
        imagen: sintoma.image,
        descripcion: sintoma.description,
        mostrarEstrellas: false,
        estrellas: 0,
        tipo: sintoma.type
      }));

      // Agrupar los síntomas por tipo
      this.sintomas.forEach(sintoma => {
        if (this.sintomasPorTipo[sintoma.tipo] !== undefined) {
          this.sintomasPorTipo[sintoma.tipo].push(sintoma);
        }
      });

    } catch (error) {
      console.error('Error al obtener los síntomas:', error);
    }
  }

  async enviarSintomas() {
    // Filtrar los síntomas que tienen una calificación (estrellas > 0)
    const sintomasCalificados = this.sintomas
      .filter(sintoma => sintoma.estrellas > 0) // Solo síntomas con calificación
      .map(sintoma => ({
        nombre: sintoma.nombre,
        intensidad: sintoma.estrellas // La intensidad es la cantidad de estrellas
      }));

    // Verificar si hay síntomas calificados
    if (sintomasCalificados.length === 0) {
      console.log("No hay síntomas calificados para enviar.");
      return;
    }

    try {
      // Enviar los síntomas calificados a través del servicio

      this.router.navigate(['/loading']);
      console.log(sintomasCalificados);
    } catch (error) {
      console.error("Error al enviar los síntomas calificados:", error);
    }
  }
}
