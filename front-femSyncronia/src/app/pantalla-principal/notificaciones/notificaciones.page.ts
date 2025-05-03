import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  cerrarPantalla() {
    this.navCtrl.back(); // Regresa a la pantalla anterior
  }

  ngOnInit() {
  }

}
