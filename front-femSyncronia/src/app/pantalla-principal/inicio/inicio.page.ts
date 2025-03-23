import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  misLabelsY: string[] = ['35°C', '36°C', '37°C', '38°C', '39°C', '40°C', '41°C'];
  minTemp: number = 34;
  maxTemp: number = 42;
  profileImage: string = '/assets/img/pantalla-principal/Foto-perfil.svg'; // Ruta de la imagen de perfil por defecto
  userId: string | null = null;
  nombreCompleto: string = '';
  email: string = '';
  componenteActivo: string = '';
  // Propiedades para manejar el mes y el año
  mesActual: number = 0;
  anoActual: number = 0;
  fechaActual: Date = new Date();

  // Propiedades para el ciclo menstrual
  fechaInicio = new Date(2025, 1, 15); // 1 de Octubre de 2023
  fechaFin = new Date(2025, 1, 28); // 15 de Octubre de 2023

  // Propiedades para las etiquetas
  diaActual: number = 0; // Número del día actual
  indice: number = 1; // Número del índice (puedes cambiarlo según sea necesario)

  constructor(
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) { }
  mostrarComponente(componente: string) {
    this.componenteActivo = componente;
  }

  ocultarComponente() {
    this.componenteActivo = '';
  }


  ngOnInit() {
    this.cargarUsuario(); // Llama a la función para cargar los datos del usuario
    this.actualizarMes(this.fechaActual); // Inicializa el mes y año con la fecha actual
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
                this.nombreCompleto = `${userData.name} ${userData.lastname}`;
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

  // Actualizar el día y el índice cuando se selecciona un día del calendario
  actualizarDiaSeleccionado(event: { diaActual: number, indice: number }) {
    this.diaActual = event.diaActual;
    this.indice = event.indice;
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

  /**
   * Actualiza el mes y año mostrados
   */
  actualizarMes(fecha: Date) {
    this.mesActual = fecha.getMonth(); // Esto es un número
    this.anoActual = fecha.getFullYear(); // Esto también es un número
  }

  // Retroceder al mes anterior
  mesAnterior() {
    this.fechaActual.setMonth(this.fechaActual.getMonth() - 1);
    this.actualizarMes(this.fechaActual);
  }

  // Avanzar al siguiente mes
  mesSiguiente() {
    this.fechaActual.setMonth(this.fechaActual.getMonth() + 1);
    this.actualizarMes(this.fechaActual);
  }

  //Obtiene el nombre del mes
  obtenerNombreMes(mes: number): string {
    const nombresMeses = [
      'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.',
      'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'
    ];
    return nombresMeses[mes];
  }
}
