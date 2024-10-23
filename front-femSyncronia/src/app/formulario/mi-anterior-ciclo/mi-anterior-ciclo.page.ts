import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-anterior-ciclo',
  templateUrl: './mi-anterior-ciclo.page.html',
  styleUrls: ['./mi-anterior-ciclo.page.scss'],
})
export class MiAnteriorCicloPage implements OnInit {
  meses: string[] = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
  dias: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  // Actualiza los días dependiendo del mes seleccionado
  actualizarDias(event: any) {
    const mesSeleccionado = event.detail.value;

    if (mesSeleccionado === 'Febrero') {
      this.dias = Array.from({ length: 28 }, (_, i) => i + 1); // 28 días para febrero
    } else if (['Abril', 'Junio', 'Septiembre', 'Noviembre'].includes(mesSeleccionado)) {
      this.dias = Array.from({ length: 30 }, (_, i) => i + 1); // 30 días para meses con 30 días
    } else {
      this.dias = Array.from({ length: 31 }, (_, i) => i + 1); // 31 días para los demás meses
    }
  }
}
