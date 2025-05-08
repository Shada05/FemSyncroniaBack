import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-piel',
  templateUrl: './piel.page.html',
  styleUrls: ['./piel.page.scss'],
})
export class PielPage implements OnInit {

    constructor(private navCtrl: NavController) {}
  
    cerrarPantalla() {
      this.navCtrl.back(); 
    }

  ngOnInit() {
  }

}
