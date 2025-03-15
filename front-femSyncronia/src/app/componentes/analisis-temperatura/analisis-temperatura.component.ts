import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-analisis-temperatura',
  templateUrl: './analisis-temperatura.component.html',
  styleUrls: ['./analisis-temperatura.component.scss'],
})
export class AnalisisTemperaturaComponent {
  @Output() cerrarComponente = new EventEmitter<void>();

  cerrar() {
    this.cerrarComponente.emit();
  }
}