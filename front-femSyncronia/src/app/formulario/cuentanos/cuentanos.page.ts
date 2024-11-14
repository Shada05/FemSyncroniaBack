import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuentanos',
  templateUrl: './cuentanos.page.html',
  styleUrls: ['./cuentanos.page.scss'],
})
export class CuentanosPage implements OnInit {
  anioActual: number = 0;
  anios: number[] = [];

  constructor() { }

  ngOnInit() {
    this.anioActual = new Date().getFullYear();
    this.generarAnios();
  }

  generarAnios() {
    // Rango de edad: 11 a 56 años
    const edadMinima = 11;
    const edadMaxima = 56;

    for (let edad = edadMinima; edad <= edadMaxima; edad++) {
      this.anios.push(this.anioActual - edad);
    }
  }
}
