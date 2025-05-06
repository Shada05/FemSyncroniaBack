import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(private navCtrl: NavController) {}
  
    cerrarPantalla() {
      this.navCtrl.back(); 
    }

  ngOnInit() {
  }

}
