import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  @Output() cerrarComponente = new EventEmitter<void>(); // Evento para cerrar el componente
  estaCerrando = false; // Variable para controlar la animación
  
  // Lista de items del historial
  itemsHistorial = [
    { titulo: 'Fin periodo', fecha: '16 may' },
    { titulo: 'Registro de síntomas', fecha: '10 may' },
    { titulo: 'Inicio de periodo', fecha: '25 abr' },
    { titulo: 'Registro peso', fecha: '18 abr' },
    { titulo: 'Registro de temperatura', fecha: '5 abr' },
    { titulo: 'Configuraciones', fecha: '25 dic 2024' },
  ];

  // Función para cerrar
  cerrar() {
    this.estaCerrando = true; // Activa la animación
    setTimeout(() => {
      this.cerrarComponente.emit(); // Emite el evento después de la animación
    }, 300); // Espera a que termine la animación (300ms)
  }
}