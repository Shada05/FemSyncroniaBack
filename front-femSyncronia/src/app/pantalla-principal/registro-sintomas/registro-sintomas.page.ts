import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.cargarUsuario();
    this.obtenerSintomas();
    this.route.params.subscribe((params) => {
      this.fechaDeRegistro = params['fecha'];
      console.log('Fecha de registro:', this.fechaDeRegistro);
    });
  }

  async obtenerSintomas() {
    this.cargando = true;
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
        tipo: sintoma.type,
      }));

      // Agrupar los síntomas por tipo
      this.sintomas.forEach((sintoma) => {
        if (this.sintomasPorTipo[sintoma.tipo] !== undefined) {
          this.sintomasPorTipo[sintoma.tipo].push(sintoma);
        }
      });
      this.errorCarga = false;
    } catch (error) {
      console.error('Error al obtener los síntomas:', error);
      this.errorCarga = true;
    } finally {
      this.cargando = false;
    }
  }


  async registrarCiclo() {
    if (!this.userId) {
      console.error('No hay usuario identificado');
      return;
    }

    // Preparamos los datos para enviar
    const datosCiclo = {
      user_id: this.userId,
      date: this.fechaDeRegistro, // Usamos el día seleccionado
      F_15: this.sangradoGotas,
      notes: this.notasValue,
      temperature: this.temperatura,
      weight: this.peso,
      symptoms: this.obtenerSintomasSeleccionados(),
    };

    try {
      // Llamamos a la API para crear el ciclo
      const respuesta = await lastValueFrom(
        this.apiService.crearCiclo(datosCiclo)
      );
      console.log('Ciclo registrado con éxito:', respuesta);

      // Mostramos mensaje de éxito
      await this.mostrarAlerta(
        'Éxito',
        'El ciclo se ha registrado correctamente'
      );

      // Opcional: Reiniciamos el formulario
      this.reiniciarFormulario();
    } catch (error) {
      console.error('Error al registrar el ciclo:', error);
      await this.mostrarAlerta(
        'Error',
        'No se pudo registrar el ciclo. Inténtalo de nuevo.'
      );
    }
  }

  // Obtiene los síntomas seleccionados con su intensidad
  private obtenerSintomasSeleccionados(): any[] {
    return this.sintomas
      .filter((sintoma) => sintoma.estrellas > 0)
      .map((sintoma) => ({
        symptom_id: sintoma.id, // Asumiendo que cada síntoma tiene un id
        intensity: sintoma.estrellas,
      }));
  }

  // Muestra alertas al usuario
  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alerta = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alerta.present();
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
