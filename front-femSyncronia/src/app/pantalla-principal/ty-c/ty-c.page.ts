import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ty-c',
  templateUrl: './ty-c.page.html',
  styleUrls: ['./ty-c.page.scss'],
})
export class TyCPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  cerrarPantalla() {
    this.navCtrl.back(); 
  }

  ngOnInit() {}
}
