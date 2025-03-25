import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  userId: string | null = null;
  nombre: string = '';
  apellido:string = '';
  email: string = '';
  profileImage: string = '/assets/img/pantalla-principal/Foto-perfil.svg';
  constructor(private navCtrl: NavController,
    private apiService: ApiService,
    private authService: AuthService,
  ) { } // Inyecta NavController

  ngOnInit() {
    this.cargarUsuario();
   }

  cerrarPantalla() {
    this.navCtrl.back(); // Regresa a la pantalla anterior
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
                this.nombre = `${userData.name}`;
                this.apellido = `${userData.lastname}`;
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
}
