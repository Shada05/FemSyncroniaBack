import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  profileImage: string = '/assets/img/registro/defaul-perfil.svg';
  constructor() { }

  ngOnInit() {
  }

}
