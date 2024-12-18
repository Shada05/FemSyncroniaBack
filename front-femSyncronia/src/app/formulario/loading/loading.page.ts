import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  porcentaje: number = 0; // Porcentaje inicial
  activeSegment: number = 1; // Segmento activo (1, 2 o 3)

  constructor(
    private router: Router // Inyecta el Router
  ) { }

  ngOnInit() {
    this.simularProgreso(); // Iniciar simulación de carga
  }

  simularProgreso() {
    let contador = 0; // Contador interno para manejar los segmentos
    const intervalo = setInterval(() => {
      if (this.porcentaje < 100) {
        this.porcentaje += 10; // Incrementar porcentaje
        contador++;
        this.activeSegment = ((contador - 1) % 3) + 1; // Cambiar segmento activo
      } else {
        clearInterval(intervalo); // Detener el intervalo al llegar al 100%
        this.router.navigate(['/formulario-completado']); // Navegar al finalizar
      }
    }, 1000); // Cambiar cada 1000 ms
  }
}
