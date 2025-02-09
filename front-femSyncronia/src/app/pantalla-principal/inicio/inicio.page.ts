import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  profileImage: string = '/assets/img/pantalla-principal/Foto-perfil.svg'; // Ruta de la imagen de perfil por defecto
  userId: string | null = null;
  nombreCompleto: string = '';
  email: string = '';

  constructor(
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarUsuario(); // Llama a la función para cargar los datos del usuario
  }

  // Función para cargar los datos del usuario y la imagen de perfil
  async cargarUsuario() {
    const token = await this.authService.obtenerToken();
    if (token) {
      this.authService.verificarToken(token).subscribe({
        next: (response) => {
          this.userId = response.user.id; // Obtiene el ID del usuario desde el token
          console.log('ID obtenido del token:', this.userId);

          // Llama a la API para obtener los datos del usuario
          if (this.userId) {
            this.apiService.mostrarUsuario(this.userId).subscribe({
              next: (userData) => {
                // Guarda los datos del usuario
                this.nombreCompleto = `${userData.name} ${userData.lastname}`
                this.email = userData.email;

                // Carga la imagen de perfil si existe
                if (userData.profile_image) {
                  this.profileImage = userData.profile_image;
                  console.log('Imagen de perfil cargada:', this.profileImage);
                } else {
                  console.warn('No se encontró imagen de perfil en la BD.');
                }
              },
              error: (error) => {
                console.error('Error al cargar los datos del usuario:', error);
              },
            });
          } else {
            console.error('No se encontró el ID del usuario.');
          }
        },
        error: (error) => {
          console.error('Error al verificar el token:', error);
        },
      });
    } else {
      console.log('No hay token almacenado.');
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

  /**
   * Cierra la sesión del usuario
   */
  async logout() {
    await this.authService.cerrarSesion(); // Cierra la sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}