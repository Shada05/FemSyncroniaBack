import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  constructor(private navCtrl: NavController) { } // Inyecta NavController

  ngOnInit() {}

  cerrarPantalla() {
    this.navCtrl.back(); // Regresa a la pantalla anterior
  }
}
