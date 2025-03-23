import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.scss']
})
export class CiclosComponent {
  estaCerrando = false; // Variable para controlar la animación
  @Output() cerrarComponente = new EventEmitter<void>(); // Evento para cerrar el componente

  // Función para cerrar
  cerrar() {
    this.estaCerrando = true; // Activa la animación
    setTimeout(() => {
      this.cerrarComponente.emit(); // Emite el evento después de la animación
    }, 300); // Espera a que termine la animación (300ms)
  }
}