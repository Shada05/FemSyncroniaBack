import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SintomaPopoverComponent } from '../sintoma-popover/sintoma-popover.component';

@Component({
  selector: 'app-sintomas-container',
  templateUrl: './sintomas-container.component.html',
  styleUrls: ['./sintomas-container.component.scss'],
})
export class SintomasContainerComponent implements OnInit {
  @Input() sintomas: any[] = [];
  @Input() sintomasPorTipo: { [key: number]: any[] } = {};
  sintomaSeleccionado: any = null;

  @Input() cargando: boolean = false;
  @Input() errorCarga: boolean = false;
  
  // Mapeo manual de tipos de síntomas
  tiposSintomas = [
    { id: 0, nombre: 'Dolores musculares:' },
    { id: 1, nombre: 'Malestares:' },
    { id: 2, nombre: 'Problemas de piel:' },
    { id: 3, nombre: 'Emociones:' },
    { id: 4, nombre: 'Fluidos:' },
    { id: 5, nombre: 'Acto sexual:' },
  ];

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  toggleEstrellas(sintoma: any) {
    // Si hay un síntoma seleccionado previamente y no tiene calificación, ocultar sus estrellas
    if (
      this.sintomaSeleccionado &&
      this.sintomaSeleccionado !== sintoma &&
      this.sintomaSeleccionado.estrellas === 0
    ) {
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
    const tipoEncontrado = this.tiposSintomas.find((t) => t.id === tipo);
    return tipoEncontrado ? tipoEncontrado.nombre : 'Desconocido';
  }

  // Función para mostrar el popover
  async mostrarPopover(event: any, sintoma: any) {
    const popover = await this.popoverCtrl.create({
      component: SintomaPopoverComponent,
      event: event,
      showBackdrop: false,
      cssClass: 'custom-popover',
      componentProps: {
        description: sintoma.descripcion,
      },
    });

    await popover.present();
  }
}
