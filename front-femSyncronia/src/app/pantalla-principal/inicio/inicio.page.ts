import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; // Importa el controlador del menú

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  profileImage: string = '/assets/img/pantalla-principal/Foto-perfil.svg'; // Ruta de la imagen de perfil

  constructor(private menuCtrl: MenuController) { } // Inyecta el controlador del menú

  ngOnInit() { }

  /**
   * Abre el menú lateral cuando se hace clic en la imagen de perfil
   */
  abrirMenuPerfil() {
    this.menuCtrl.open('menu-perfil'); // Abre el menú con el ID 'menu-perfil'
  }

  /**
   * Cierra el menú lateral si está abierto
   */
  cerrarMenuPerfil() {
    this.menuCtrl.close('menu-perfil'); // Cierra el menú con el ID 'menu-perfil'
  }

  /**
   * Comprueba si el menú lateral está abierto
   */
  async isMenuOpen(): Promise<boolean> {
    return this.menuCtrl.isOpen('menu-perfil'); // Retorna el estado del menú con el ID 'menu-perfil'
  }
}
