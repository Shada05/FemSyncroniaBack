import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-hidratate',
  templateUrl: './hidratate.page.html',
  styleUrls: ['./hidratate.page.scss'],
})
export class HidratatePage implements OnInit {

    constructor(private navCtrl: NavController) {}
  
    cerrarPantalla() {
      this.navCtrl.back(); 
    }

  ngOnInit() {
  }

}
