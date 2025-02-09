import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular'; // Importar PopoverController
import { SintomaPopoverComponent } from '../sintoma-popover/sintoma-popover.component';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {
  sintomas: any[] = [];
  sintomasPorTipo: { [key: number]: any[] } = {};
  sintomaSeleccionado: any = null;

  // Mapeo manual de tipos de síntomas
  tiposSintomas = [
    { id: 0, nombre: "Dolores musculares:" },
    { id: 1, nombre: "Malestares:" },
    { id: 2, nombre: "Problemas de piel:" },
    { id: 3, nombre: "Emociones:" },
    { id: 4, nombre: "Fluidos:" },
    { id: 5, nombre: "Acto sexual:" }
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private popoverCtrl: PopoverController
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

  toggleEstrellas(sintoma: any) {
    // Si hay un síntoma seleccionado previamente y no tiene calificación, ocultar sus estrellas
    if (this.sintomaSeleccionado && this.sintomaSeleccionado !== sintoma && this.sintomaSeleccionado.estrellas === 0) {
      this.sintomaSeleccionado.mostrarEstrellas = false;
    }

    // Mostrar/ocultar estrellas del síntoma actual si no tiene calificación
    if (sintoma.estrellas === 0) {
      sintoma.mostrarEstrellas = !sintoma.mostrarEstrellas;
    }

    // Actualizar el síntoma seleccionado
    this.sintomaSeleccionado = sintoma;
  }

  calificar(sintoma: any, estrellas: number) {
    // Si el usuario hace clic en la misma cantidad de estrellas que ya tiene, se quita la calificación
    if (sintoma.estrellas === estrellas) {
      sintoma.estrellas = 0; // Quitar la calificación
    } else {
      sintoma.estrellas = estrellas; // Asignar la nueva calificación
    }
  }

  // Función para obtener el nombre del tipo de síntoma
  obtenerNombreTipo(tipo: number): string {
    const tipoEncontrado = this.tiposSintomas.find(t => t.id === tipo);
    return tipoEncontrado ? tipoEncontrado.nombre : "Desconocido";
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

  // Función para mostrar el popover
  async mostrarPopover(event: any, sintoma: any) {
    const popover = await this.popoverCtrl.create({
      component: SintomaPopoverComponent,
      event: event,
      showBackdrop: false,
      cssClass: 'custom-popover',
      componentProps: {
        description: sintoma.descripcion
      }
    });

    await popover.present();
  }
}
