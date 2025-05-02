import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { NavController } from '@ionic/angular';

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
  notasValue: string = '';
  tuvoActoSexual: boolean = false;
  usoProteccion: boolean = false;
  orgasmoSeleccionado: string | null = null;
  cargando = true;
  errorCarga = false;
  temperatura: number = 0;
  peso: number = 0;
  mesActual: number = new Date().getMonth();
  anoActual: number = new Date().getFullYear();
  fechaDeRegistro: String | null = null;
  indiceCiclo: number | null = null;
  periodoIniciado: boolean = false;
  diasRetraso: number = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilidades: UtilidadesService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.cargarUsuario();

    const params = this.route.snapshot.params;
    this.fechaDeRegistro = params['fecha'] || 'hoy';
    this.diasRetraso = params['retraso'] || null;

    await this.obtenerSintomas();
  }

  alternarPeriodo() {
    this.periodoIniciado = !this.periodoIniciado;
  }

  async obtenerSintomas() {
    this.cargando = true;

    try {
      console.log('Cargando:', this.cargando, 'Error:', this.errorCarga);
      const data = await lastValueFrom(this.apiService.obtenerSintomas());

      this.sintomasPorTipo = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };

      this.sintomas = data.map((sintoma: any) => ({
        nombre: sintoma.name,
        imagen: sintoma.image,
        descripcion: sintoma.description,
        mostrarEstrellas: false,
        estrellas: 0,
        tipo: sintoma.type,
      }));

      this.sintomas.forEach((sintoma) => {
        if (this.sintomasPorTipo[sintoma.tipo] !== undefined) {
          this.sintomasPorTipo[sintoma.tipo].push(sintoma);
        }
      });

      this.renombrarSintomas();
      this.errorCarga = false; // Todo salió bien
    } catch (error) {
      console.error('Error al obtener los síntomas:', error);
      this.errorCarga = true; // Mostrar mensaje de error
    } finally {
      this.cargando = false; // Ocultar spinner
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
        switch (
          parseInt(tipo) // Convertir el tipo a número
        ) {
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

  async registrarCiclo() {
    if (!this.userId) {
      this.utilidades.mostrarToastAdvertencia('No hay usuario identificado');
      return;
    }
  
    await this.utilidades.mostrarLoading('Registrando datos...');
    console.log('ha iniciado el periodo? ',this.periodoIniciado)
    console.log('hay dias de retraso? ',this.diasRetraso)
    // Si periodoIniciado es true y hay días de retraso, registrar esos datos primero
    if (this.periodoIniciado && this.diasRetraso) {
      const averageCiclo = 25;
      const fechaRegistroValida = (this.fechaDeRegistro ?? new Date().toISOString().split('T')[0]).toString();
      const startDate = new Date(fechaRegistroValida);      
      const finishDate = new Date(startDate);
      finishDate.setDate(startDate.getDate() + averageCiclo - 1);
  
      const datosRetraso = {
        user_id: this.userId,
        cycle_status: 1,
        Start_day: startDate.toISOString().split('T')[0],
        average_periodo: 5,
        average_ciclo: averageCiclo,
        Finish_day: finishDate.toISOString().split('T')[0],
      };
  
      try {
        await lastValueFrom(this.apiService.createCiclo(datosRetraso));
        console.log('Datos de retraso registrados exitosamente.');
      } catch (error) {
        console.error('Error al registrar los datos de retraso:', error);
      }
    }
  
    const sintomasCalificados = this.sintomas
      .filter((sintoma) => sintoma.estrellas > 0)
      .map((sintoma) => ({
        nombre: sintoma.nombreRenombrado || sintoma.nombre,
        intensidad: sintoma.estrellas,
      }));
  
    const temperaturaValida = (!this.temperatura || isNaN(this.temperatura) || Number(this.temperatura) <= 0)
      ? 36.5 : Number(this.temperatura);
  
    const pesoValido = (!this.peso || isNaN(this.peso) || Number(this.peso) <= 0)
      ? 60 : Number(this.peso);
  
    const sangradoValido = (!this.sangradoGotas || isNaN(this.sangradoGotas) || Number(this.sangradoGotas) <= 0)
      ? 0 : Number(this.sangradoGotas);
  
    const datosCiclo: any = {
      user_id: this.userId,
      date: this.fechaDeRegistro,
      F_15: sangradoValido,
      notes: this.notasValue || '',
      temperature: temperaturaValida,
      weight: pesoValido,
    };
  
    sintomasCalificados.forEach((sintoma) => {
      datosCiclo[sintoma.nombre] = parseInt(sintoma.intensidad);
    });
  
    try {
      const respuesta = await lastValueFrom(this.apiService.crearCiclo(datosCiclo));
      console.log('Síntomas del ciclo registrados:', respuesta);
  
      await this.utilidades.ocultarLoading();
      this.utilidades.mostrarToastAdvertencia('Datos registrados correctamente');
      this.apiService.notificarActualizacion();
      this.navCtrl.back();
      this.reiniciarFormulario();
    } catch (error) {
      await this.utilidades.ocultarLoading();
      console.error('Error al registrar los síntomas del ciclo:', error);
      this.utilidades.mostrarToastAdvertencia('Error al registrar los datos');
    }
  }

  // Reinicia el formulario después de enviar
  private reiniciarFormulario() {
    this.sangradoGotas = 0;
    this.notasValue = '';
    this.tuvoActoSexual = false;
    this.usoProteccion = false;
    this.orgasmoSeleccionado = null;
    this.temperatura = 0;
    this.peso = 0;

    // Reinicia las estrellas de los síntomas si es necesario
    this.sintomas.forEach((s) => {
      s.estrellas = 0;
      s.mostrarEstrellas = false;
    });
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
  validarDecimal(event: any, campo: 'peso' | 'temperatura') {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    // Reemplaza todo excepto números y punto
    valor = valor.replace(/[^\d.]/g, '');

    // Elimina puntos duplicados
    const partes = valor.split('.');
    if (partes.length > 2) {
      valor = partes[0] + '.' + partes[1];
    }

    // Limita a dos decimales
    if (partes.length === 2) {
      partes[1] = partes[1].slice(0, 2);
      valor = partes[0].slice(0, 2) + '.' + partes[1];
    } else {
      valor = partes[0].slice(0, 2);
    }

    input.value = valor;

    // Guarda en la variable correspondiente si quieres usarlo
    if (campo === 'peso') this.peso = parseFloat(valor);
    if (campo === 'temperatura') this.temperatura = parseFloat(valor);
  }
}
