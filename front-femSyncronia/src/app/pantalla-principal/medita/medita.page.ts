import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-medita',
  templateUrl: './medita.page.html',
  styleUrls: ['./medita.page.scss'],
})
export class MeditaPage implements OnInit {

      constructor(private navCtrl: NavController) {}
    
      cerrarPantalla() {
        this.navCtrl.back(); 
      }

  ngOnInit() {
  }

}
