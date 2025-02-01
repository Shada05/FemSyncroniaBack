import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; // Importa el controlador del menú
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  profileImage: string = '/assets/img/pantalla-principal/Foto-perfil.svg'; // Ruta de la imagen de perfil
  userId: string | null = null;

  constructor(private menuCtrl: MenuController, private apiService: ApiService) { } // Inyecta el controlador del menú

  ngOnInit() {
    this.obtenerUsuarioId();

    if (this.userId) {
      this.cargarImagenPerfil();
    }
  }

  // Obtener el ID del usuario desde localStorage
  obtenerUsuarioId() {
    const idGuardado = localStorage.getItem('usuarioId');
    if (idGuardado) {
      this.userId = idGuardado;
      console.log(this.userId);
    } else {
      console.error('No se encontró el ID del usuario en localStorage.');
    }
  }

  cargarImagenPerfil() {
    // Verificar si userId es un string antes de llamar a la API
    if (this.userId) {
      this.apiService.mostrarUsuario(this.userId).subscribe({
        next: (response) => {
          if (response.profile_image) {
            this.profileImage = response.profile_image;
            console.log("Imagen de perfil cargada:", this.profileImage);
          } else {
            console.log(response.profile_image);
            console.warn("No se encontró imagen de perfil en la BD.");
          }
        },
        error: (error) => {
          console.error("Error al cargar la imagen de perfil:", error);
        }
      });
    } else {
      console.error('No se encontró el ID del usuario.');
    }
  }
  
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
