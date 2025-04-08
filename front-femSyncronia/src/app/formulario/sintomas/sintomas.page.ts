import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {
  sintomas: any[] = [];
  sintomasPorTipo: { [key: number]: any[] } = {};
  sintomaSeleccionado: any = null;
  userId: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private utilidadesService: UtilidadesService
  ) { }

  async ngOnInit() {
    await this.obtenerSintomas();
    this.obtenerUsuarioId();
  }

  // Función para obtener el ID del usuario desde el token
  async obtenerUsuarioId() {
    const token = await this.authService.obtenerToken();
    if (token) {
      this.authService.verificarToken(token).subscribe({
        next: (response) => {
          this.userId = response.user.id;
          console.log('ID obtenido del token:', this.userId);
        },
        error: async (error) => {
          console.error('Error al verificar el token:', error);
          await this.utilidadesService.mostrarToastAdvertencia('Error al obtener el ID de usuario');
        },
      });
    } else {
      console.log('No hay token almacenado.');
      await this.utilidadesService.mostrarToastAdvertencia('No se encontró token de autenticación');
    }
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

      // Renombrar los síntomas según su tipo
      this.renombrarSintomas();

    } catch (error) {
      console.error('Error al obtener los síntomas:', error);
    }
  }

  // Función para renombrar los síntomas según su tipo
  renombrarSintomas() {
    // Recorrer los síntomas por tipo
    for (const tipo in this.sintomasPorTipo) {
      if (this.sintomasPorTipo.hasOwnProperty(tipo)) {
        const sintomasDelTipo = this.sintomasPorTipo[tipo];

        // Obtener las iniciales según el tipo
        let iniciales = '';
        switch (parseInt(tipo)) { // Convertir el tipo a número
          case 0:
            iniciales = 'DM_';
            break;
          case 1:
            iniciales = 'M_';
            break;
          case 2:
            iniciales = 'PP_';
            break;
          case 3:
            iniciales = 'E_';
            break;
          case 4:
            iniciales = 'F_';
            break;
          case 5:
            iniciales = 'AS_';
            break;
          default:
            iniciales = 'OTRO'; // En caso de un tipo no definido
        }

        // Renombrar los síntomas del tipo actual
        sintomasDelTipo.forEach((sintoma, index) => {
          sintoma.nombreRenombrado = `${iniciales}${index + 1}`; // index + 1 para empezar desde 1
        });
      }
    }
  }

  async enviarSintomas() {
    // Verificar que el userId esté disponible
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      await this.utilidadesService.mostrarToastAdvertencia('Error: No se puede actualizar sin un ID de usuario');
      return;
    }

    // Filtrar los síntomas que tienen una calificación (estrellas > 0)
    const sintomasCalificados = this.sintomas
      .filter(sintoma => sintoma.estrellas > 0) // Solo síntomas con calificación
      .map(sintoma => ({
        nombre: sintoma.nombreRenombrado || sintoma.nombre, // Usar el nombre renombrado si existe
        intensidad: sintoma.estrellas // La intensidad es la cantidad de estrellas
      }));

    // Verificar si hay síntomas calificados
    if (sintomasCalificados.length === 0) {
      console.log("No hay síntomas calificados para enviar.");
      await this.utilidadesService.mostrarToastAdvertencia('Por favor, califica al menos un síntoma'); 
      return;
    }

    // Crear el objeto de datos para enviar al backend
    const data: any = {};

    // Transformar los síntomas calificados al formato que el backend espera
    sintomasCalificados.forEach(sintoma => {
      data[sintoma.nombre] = parseInt(sintoma.intensidad); // Ejemplo: { DM_1: 3, M_1: 2, ... }
    });

    try {
      await this.utilidadesService.mostrarLoading('Enviando datos...');
      // Llamar al método updateCycles del ApiService
      const response = await lastValueFrom(this.apiService.updateCycles(this.userId, data));
      console.log('Respuesta del servidor:', response);

      await this.utilidadesService.ocultarLoading();
      this.router.navigate(['/loading']);
    } catch (error) {
      console.error("Error al enviar los síntomas calificados:", error);
      await this.utilidadesService.mostrarToastAdvertencia('Error al enviar los síntomas. Intenta nuevamente.'); // Mostrar mensaje de error
    }
  }
}