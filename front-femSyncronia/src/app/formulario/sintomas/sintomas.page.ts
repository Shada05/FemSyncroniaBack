import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {
  sintomas = [
    {
      nombre: 'Dolor de cabeza',
      imagen: 'assets/img/sintomas/dolor-cabeza.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    {
      nombre: 'Cólicos',
      imagen: 'assets/img/sintomas/colicos.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    {
      nombre: 'Fatiga',
      imagen: 'assets/img/sintomas/fatiga.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    {
      nombre: 'Fatiga',
      imagen: 'assets/img/sintomas/fatiga.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    {
      nombre: 'Fatiga',
      imagen: 'assets/img/sintomas/fatiga.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    {
      nombre: 'Fatiga',
      imagen: 'assets/img/sintomas/fatiga.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    {
      nombre: 'Fatiga',
      imagen: 'assets/img/sintomas/fatiga.png',
      mostrarEstrellas: false,
      estrellas: 0,
    },
    
    // Agrega más síntomas aquí
  ];
  constructor() { }

  ngOnInit() {
  }
  // Función para mostrar/ocultar las estrellas
  toggleEstrellas(sintoma: any) {
    sintoma.mostrarEstrellas = !sintoma.mostrarEstrellas;
  }

  // Función para calificar con estrellas
  calificar(sintoma: any, estrellas: number) {
    sintoma.estrellas = estrellas;
  }
}
