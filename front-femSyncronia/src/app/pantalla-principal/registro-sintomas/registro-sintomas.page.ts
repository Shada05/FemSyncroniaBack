import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro-sintomas',
  templateUrl: './registro-sintomas.page.html',
  styleUrls: ['./registro-sintomas.page.scss'],
})

export class RegistroSintomasPage implements OnInit {
  profileImage: string = '/assets/img/pantalla-principal/Foto-perfil.svg';
  userId: string | null = null;
  sangradoGotas: number = 0;
  sintomas: any[] = [];
  sintomasPorTipo: { [key: number]: any[] } = {};
  sintomaSeleccionado: any = null;
  notasValue: string = ''; // Asegúrate de que esté inicializado
  tuvoActoSexual: boolean = false; // Estado del toggle "Relaciones"
  usoProteccion: boolean = false; // Estado del toggle "Protección"
  orgasmoSeleccionado: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.cargarUsuario();
    this.obtenerSintomas();
  }

  async obtenerSintomas() {
    try {
      const data = await lastValueFrom(this.apiService.obtenerSintomas());

      // Inicializar el objeto de síntomas por tipo
      this.sintomasPorTipo = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };

      // Mapear los síntomas y organizarlos por tipo
      this.sintomas = data.map((sintoma: any) => ({
        nombre: sintoma.name,
        imagen: sintoma.image,
        descripcion: sintoma.description,
        mostrarEstrellas: false,
        estrellas: 0,
        tipo: sintoma.type
      }));

      // Agrupar los síntomas por tipo
      this.sintomas.forEach(sintoma => {
        if (this.sintomasPorTipo[sintoma.tipo] !== undefined) {
          this.sintomasPorTipo[sintoma.tipo].push(sintoma);
        }
      });

    } catch (error) {
      console.error('Error al obtener los síntomas:', error);
    }
  }

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

  calificarSangrado(gota: number) {
    if (this.sangradoGotas === gota) {
      this.sangradoGotas = 0; // Si hace clic en la misma gota, reinicia
    } else {
      this.sangradoGotas = gota; // Asigna la nueva calificación
    }
  }

  // Función para manejar el evento de entrada en el textarea
  onNotasInput(event: any) {
    console.log('Valor de notasValue:', this.notasValue); // Depuración
  }

  // Función para seleccionar una opción de orgasmo
  seleccionarOrgasmo(opcion: string) {
    this.orgasmoSeleccionado = opcion;
  }
}
