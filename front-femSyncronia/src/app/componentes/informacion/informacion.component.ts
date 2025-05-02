import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent  implements OnInit, OnDestroy {

    // Propiedades para el carrusel
    mostrarInfoFlujo = false;
    mostrarInfoEleccion = false; 
    mostrarInfoOpciones = false;
  
    imagenesCarrusel: string[] = [
      'assets/img/carrusel/flujo.svg',
      'assets/img/carrusel/periodo.svg',
      'assets/img/carrusel/versus.svg'
    ];
    
    slideVisual = 1;
    sinTransicion = false;
    intervalo: any;
  
    ngOnInit(): void {
      this.iniciarCarrusel();
    }
    
    iniciarCarrusel() {
      this.intervalo = setInterval(() => {
        this.irASiguienteSlide();
      }, 5000);
    }
    
    irASiguienteSlide() {
      if (this.slideVisual < this.imagenesCarrusel.length) {
        this.slideVisual++;
      } else {
        this.slideVisual++;
        setTimeout(() => {
          this.sinTransicion = true;
          this.slideVisual = 1;
          setTimeout(() => this.sinTransicion = false, 50);
        }, 5000);
      }
    }
    
    irAnteriorSlide() {
      if (this.slideVisual > 1) {
        this.slideVisual--;
      } else {
        this.slideVisual = 0; 
        setTimeout(() => {
          this.sinTransicion = true;
          this.slideVisual = this.imagenesCarrusel.length; 
          setTimeout(() => this.sinTransicion = false, 50);
        }, 5000); 
      }
    }
    
    
    irASlide(index: number) {
      this.slideVisual = index + 1;
    }

    ngOnDestroy(): void {
      if (this.intervalo) {
        clearInterval(this.intervalo); 
      }
    }
    

cuidados = [
  { img: 'assets/img/cuidados/C-1.svg', titulo: 'Tómate un descanso' },
  { img: 'assets/img/cuidados/C-2.svg', titulo: 'Equilibrio y Salud' },
  { img: 'assets/img/cuidados/C-3.svg', titulo: 'Duerme y recupérate' },
  { img: 'assets/img/cuidados/C-4.svg', titulo: 'Mima tu piel' },
  { img: 'assets/img/cuidados/C-5.svg', titulo: 'Conecta y medita' },
  { img: 'assets/img/cuidados/C-6.svg', titulo: 'Hidrátate siempre' }
];

  
  selectedCuidado: string | null = null;

  mostrarCuidado(nombre: string) {
    this.selectedCuidado = nombre;
  }
  
  ocultarPantalla() {
    this.selectedCuidado = null;
  }

  imagenesGaleria = [
    { src: 'assets/img/recomendaciones/anticonceptivos.svg', alt: 'Anticonceptivos' },
    { src: 'assets/img/recomendaciones/chequeo.svg', alt: 'Chequeo' },
    { src: 'assets/img/recomendaciones/maternidad.svg', alt: 'Maternidad' },
    { src: 'assets/img/recomendaciones/spotify.svg', alt: 'Spotify' },
    { src: 'assets/img/recomendaciones/calificanos.svg', alt: 'Califícanos' },
  ];

  selectedRecomendacion: string | null = null;

  verRecomendacion(titulo: string) {
    this.selectedRecomendacion = titulo;
  }

  cerrarRecomendacion() {
    this.selectedRecomendacion = null;
  }

  
  constructor() { }

}