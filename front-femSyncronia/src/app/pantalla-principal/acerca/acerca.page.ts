import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  cerrarPantalla() {
    this.navCtrl.back(); // Regresa a la pantalla anterior
  }

  ngOnInit() {}

}
