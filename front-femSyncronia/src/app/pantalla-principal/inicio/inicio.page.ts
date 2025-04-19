import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swiper from 'swiper';



interface Sintoma {
  id: number; // ID del síntoma
  name: string; // Nombre del síntoma
  image: string; // URL del icono del síntoma
  description?: string; // Descripción opcional
  type?: number; // Tipo opcional
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
  misLabelsY: string[] = [
    '35°C',
    '36°C',
    '37°C',
    '38°C',
    '39°C',
    '40°C',
    '41°C',
  ];
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
  fechaInicio = new Date(2025, 2, 28); 
  fechaFin = new Date(2025, 3, 24);

  // Propiedades para las etiquetas
  diaActual: number = 0; // Número del día actual
  indice: number = 1; // Número del índice (puedes cambiarlo según sea necesario)

  // Propiedades para los síntomas
  sintomasCalificados: any[] = [];

  constructor(
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}
  mostrarComponente(componente: string) {
    this.componenteActivo = componente;
  }

  ocultarComponente() {
    this.componenteActivo = '';
  }

  obtenerFechaFormateada(): string {
    const fecha = new Date(this.anoActual, this.mesActual, this.diaActual);
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  imagenesCarrusel: string[] = [
    'assets/img/1ro-carrusel/flujo.svg',
    'assets/img/1ro-carrusel/periodo.svg',
    'assets/img/1ro-carrusel/versus.svg'
  ];
  
  slideVisual = 1;
  sinTransicion = false;
  intervalo: any;
  
  ngAfterViewInit(): void {
    this.iniciarCarrusel();
  }
  
  iniciarCarrusel() {
    this.intervalo = setInterval(() => {
      this.irASiguienteSlide();
    }, 5000);
  }
  
  irASiguienteSlide() {
    if (this.slideVisual < this.imagenesCarrusel.length) {
      this.slideVisual++;
    } else {
      this.slideVisual++;
      setTimeout(() => {
        this.sinTransicion = true;
        this.slideVisual = 1;
        setTimeout(() => this.sinTransicion = false, 50);
      }, 5000);
    }
  }
  
  irAnteriorSlide() {
    if (this.slideVisual > 1) {
      this.slideVisual--;
    } else {
      this.slideVisual = 0; // ir al clon del último
      setTimeout(() => {
        this.sinTransicion = true;
        this.slideVisual = this.imagenesCarrusel.length; // última real
        setTimeout(() => this.sinTransicion = false, 50);
      }, 5000); 
    }
  }
  
  
  irASlide(index: number) {
    this.slideVisual = index + 1;
  }
  
  
  
  
  
  
  ngOnInit() {
    this.cargarUsuario(); // Llama a la función para cargar los datos del usuario
    this.actualizarMes(this.fechaActual); // Inicializa el mes y año con la fecha actual
    setInterval(() => {
      this.obtenerSintomasCalificados();
    }, 86400000); // 24 horas en milisegundos
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

                // Obtener los síntomas calificados
                this.obtenerSintomasCalificados();
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

  // Función para obtener los síntomas calificados del día actual
  async obtenerSintomasCalificados() {
    if (!this.userId) {
      console.error(
        'Error: No se puede obtener el ciclo sin un ID de usuario.'
      );
      return;
    }

    try {
      // Obtener los síntomas disponibles
      const sintomasDisponibles = await lastValueFrom(
        this.apiService.obtenerSintomas()
      );

      // Obtener todos los ciclos del usuario
      const ciclosUsuario = await lastValueFrom(
        this.apiService.mostrarCiclo(this.userId)
      );

      // Formatear fecha actual como YYYY-MM-DD para comparación
      const hoy = new Date();
      const fechaHoy = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`;

      // Buscar el ciclo que coincide con la fecha actual
      const cicloActual = ciclosUsuario.find((ciclo: any) => {
        if (!ciclo.date) return false;
        // Comparar solo la parte de fecha (ignorando hora)
        return ciclo.date.split('T')[0] === fechaHoy;
      });

      if (!cicloActual) {
        console.log('No se encontró registro para la fecha actual');
        this.sintomasCalificados = [];
        return;
      }

      // Crear un contador para asignar IDs secuenciales
      let idSecuencial = 1;

      // Filtrar los síntomas calificados del ciclo actual
      this.sintomasCalificados = Object.keys(cicloActual)
        .filter(
          (key) =>
            key.startsWith('DM_') ||
            key.startsWith('M_') ||
            key.startsWith('PP_') ||
            key.startsWith('E_') ||
            key.startsWith('F_') ||
            key.startsWith('AS_')
        )
        .map((key) => {
          const intensidad = cicloActual[key];
          const sintomaInfo = sintomasDisponibles.find(
            (s: Sintoma) => s.id === idSecuencial
          );

          const sintomaCalificado = {
            id: idSecuencial,
            nombre: sintomaInfo ? sintomaInfo.name : `Síntoma ${idSecuencial}`,
            intensidad: intensidad,
            icono: sintomaInfo ? sintomaInfo.image : null,
            nombreCampo: key, // Mantener el nombre original del campo
          };

          idSecuencial++;
          return sintomaCalificado;
        })
        .filter((sintoma) => sintoma.intensidad > 0);

      console.log('Síntomas calificados para hoy:', this.sintomasCalificados);
    } catch (error) {
      console.error('Error al obtener los síntomas calificados:', error);
      this.sintomasCalificados = [];
    }
  }

  // Actualizar el día y el índice cuando se selecciona un día del calendario
  actualizarDiaSeleccionado(event: { diaActual: number; indice: number }) {
    this.diaActual = event.diaActual;
    this.indice = event.indice;

    this.fechaActual = new Date(this.anoActual, this.mesActual, this.diaActual);
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
    try {
      // 1. Cerrar el menú si está abierto
      await this.menuCtrl.close('menu-perfil');

      // 2. Cerrar sesión en el servicio de autenticación
      await this.authService.cerrarSesion();

      // 3. Limpiar todas las variables de estado
      this.limpiarEstado();

      // 4. Redirigir al login con navegación completa
      this.router
        .navigate(['/login'], {
          replaceUrl: true, // Reemplaza la URL actual en el historial
          queryParamsHandling: 'preserve', // Opcional: mantener parámetros si es necesario
        })
        .then(() => {
          // 5. Forzar recarga completa de la aplicación
          window.location.reload();
        });
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  }

  private limpiarEstado() {
    // Resetear todas las propiedades relevantes
    this.userId = null;
    this.nombreCompleto = '';
    this.email = '';
    this.profileImage = '/assets/img/pantalla-principal/Foto-perfil.svg';
    this.sintomasCalificados = [];
    this.componenteActivo = '';
    this.mesActual = new Date().getMonth();
    this.anoActual = new Date().getFullYear();
    this.diaActual = 0;
    this.indice = 1;

    // Cerrar todos los menús
    this.menuCtrl.close();
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
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dic.',
    ];
    return nombresMeses[mes];
  }
}
