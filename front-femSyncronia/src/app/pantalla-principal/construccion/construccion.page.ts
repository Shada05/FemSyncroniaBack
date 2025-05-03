import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.page.html',
  styleUrls: ['./construccion.page.scss'],
})
export class ConstruccionPage implements OnInit {
  
  constructor(private navCtrl: NavController) {}

  cerrarPantalla() {
    this.navCtrl.back(); 
  }

  ngOnInit() {}

}
