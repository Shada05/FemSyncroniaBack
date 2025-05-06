import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  cerrarPantalla() {
    this.navCtrl.back(); 
  }

  ngOnInit() {}

}
