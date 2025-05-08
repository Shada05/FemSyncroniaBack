import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { IonTabs } from '@ionic/angular';
import { ViewChild } from '@angular/core';


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
export class InicioPage implements OnInit {
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
  fechaInicio= new Date(2025, 2, 28); 
  fechaFin = new Date(2025, 3, 24);
  private destroy$ = new Subject<void>();
  // Propiedades para las etiquetas
  diaActual: number = 0; // Número del día actual
  indice: number = 1; // Número del índice (puedes cambiarlo según sea necesario)

  duracionCiclo: number = 28;
  indiceCiclo: number = 0;
  
  // Propiedades para los síntomas
  sintomasCalificados: any[] = [];

  fechasCargadas: boolean = false;

  sintomasHoy: any[] = [];  
  sintomasDiaSeleccionado: any[] = [];  
  
  peso: number | null = null;
  temperatura: number | null = null;

  irAPestanaInformacion() {
    this.router.navigate(['/construccion']);
  }
  

  constructor(
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
  ) {}

  irANotificaciones() {
    this.router.navigate(['/notificaciones']);
  }
  
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

  async ngOnInit() {
    await this.cargarUsuario(); // Esperar a que cargue el usuario primero
  
    await this.cargarFechasDelCicloActual();
  
    this.actualizarMes(this.fechaActual);
  
    await this.obtenerSintomasCalificados();
  
    setInterval(() => {
      this.obtenerSintomasCalificados();
    }, 86400000);
  
    // Suscribirse a eventos de actualización del ciclo
    this.apiService.cicloActualizado$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cargarFechasDelCicloActual();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // Función para cargar los datos del usuario y la imagen de perfil
  async cargarUsuario() {
    const token = await this.authService.obtenerToken();
    if (!token) {
      console.log('No hay token almacenado.');
      return;
    }
  
    try {
      const response = await lastValueFrom(this.authService.verificarToken(token));
      this.userId = response.user.id;
      console.log('ID obtenido del token:', this.userId);
  
      // Esperar a que se carguen las fechas del ciclo
      await this.cargarFechasDelCicloActual();
  
      if (this.userId) {
        const userData = await lastValueFrom(this.apiService.mostrarUsuario(this.userId));
        this.nombreCompleto = `${userData.name} ${userData.lastname}`;
        this.email = userData.email;
  
        if (userData.profile_image) {
          this.profileImage = userData.profile_image;
        }
  
        this.cdr.detectChanges(); // Forzar actualización de la UI
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }

  // Función para obtener los síntomas calificados del día actual
  async obtenerSintomasCalificados() {
    if (!this.userId) return;
  
    try {
      const sintomasDisponibles = await lastValueFrom(this.apiService.obtenerSintomas());
      const ciclosUsuario = await lastValueFrom(this.apiService.mostrarCiclo(this.userId));
  
      const hoy = new Date();
      const fechaHoy = `${hoy.getFullYear()}-${(hoy.getMonth() + 1).toString().padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`;
  
      const cicloActual = ciclosUsuario.find((ciclo: any) => ciclo.date?.split('T')[0] === fechaHoy);
  
      if (cicloActual) {
        this.sintomasHoy = this.procesarSintomas(cicloActual, sintomasDisponibles);
      } else {
        this.sintomasHoy = [];
      }
    } catch (error) {
      console.error('Error al obtener síntomas:', error);
      this.sintomasHoy = [];
    }
  }
  
  private procesarSintomas(ciclo: any, sintomasDisponibles: Sintoma[]): any[] {
    let idSecuencial = 1;
    return Object.keys(ciclo)
      .filter(key => key.startsWith('DM_') || key.startsWith('M_') || key.startsWith('PP_') || 
                    key.startsWith('E_') || key.startsWith('F_') || key.startsWith('AS_'))
      .map(key => {
        const intensidad = ciclo[key];
        const sintomaInfo = sintomasDisponibles.find(s => s.id === idSecuencial);
        idSecuencial++;
  
        return {
          id: idSecuencial - 1,
          nombre: sintomaInfo?.name || `Síntoma ${idSecuencial - 1}`,
          intensidad: intensidad,
          icono: sintomaInfo?.image || null,
          nombreCampo: key
        };
      })
      .filter(sintoma => sintoma.intensidad > 0);
  }

  // Actualizar el día y el índice cuando se selecciona un día del calendario
  async actualizarDiaSeleccionado(event: { diaActual: number; indice: number }) {
    this.diaActual = event.diaActual;
    this.indice = event.indice;
    this.fechaActual = new Date(this.anoActual, this.mesActual, this.diaActual);
  
    // Actualizar síntomas para el día seleccionado
    await this.obtenerSintomasParaDiaSeleccionado();
  
    // Solo actualizar indiceCiclo si el día seleccionado es HOY
    const hoy = new Date();
    const esHoy =
      event.diaActual === hoy.getDate() &&
      this.mesActual === hoy.getMonth() &&
      this.anoActual === hoy.getFullYear();
    
    if (esHoy) {
      this.indiceCiclo = event.indice;
    }
  }
  
  // Nueva función para obtener síntomas del día seleccionado
  async obtenerSintomasParaDiaSeleccionado() {
    if (!this.userId) return;
  
    try {
      const sintomasDisponibles = await lastValueFrom(this.apiService.obtenerSintomas());
      const ciclosUsuario = await lastValueFrom(this.apiService.mostrarCiclo(this.userId));
  
      const fechaSeleccionada = new Date(this.anoActual, this.mesActual, this.diaActual);
      const fechaFormateada = `${fechaSeleccionada.getFullYear()}-${(fechaSeleccionada.getMonth() + 1)
        .toString().padStart(2, '0')}-${fechaSeleccionada.getDate().toString().padStart(2, '0')}`;
  
      const cicloDelDia = ciclosUsuario.find((ciclo: any) => ciclo.date?.split('T')[0] === fechaFormateada);
  
      this.sintomasDiaSeleccionado = cicloDelDia ? this.procesarSintomas(cicloDelDia, sintomasDisponibles) : [];
      this.peso = cicloDelDia?.weight || null;
      this.temperatura = cicloDelDia?.temperature || null;
      
    } catch (error) {
      console.error('Error al obtener síntomas:', error);
      this.sintomasDiaSeleccionado = [];
      this.peso = null;
      this.temperatura = null;
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
    try {
      // 1. Cerrar el menú si está abierto
      await this.menuCtrl.close('menu-perfil');

      // 2. Cerrar sesión en el servicio de autenticación
      await this.authService.cerrarSesion();

      // 3. Limpiar todas las variables de estado
      this.limpiarEstado();

      // 4. Redirigir al login con navegación completa
      this.router.navigateByUrl('/login', { replaceUrl: true });

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

  async cargarFechasDelCicloActual() {
    if (!this.userId) return;
  
    try {
      const ciclos = await lastValueFrom(this.apiService.mostrarCicloCalendario(this.userId));
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Normalizar la fecha actual
  
      let cicloEncontrado = false;
      let cicloAnterior: any = null;
      let diferenciaMesesAnterior = Infinity;
  
      for (const ciclo of ciclos) {
        // Parsear fechas asegurando hora local a medianoche
        const parseDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split('-').map(Number);
          return new Date(year, month - 1, day);
        };
        
        const inicio = parseDate(ciclo.Start_day);
        const fin = parseDate(ciclo.Finish_day);
        const duracion = ciclo.average_ciclo;
        // Validar si el mes y año coinciden (ignorando el día)
        if (hoy.getFullYear() === inicio.getFullYear() && hoy.getMonth() === inicio.getMonth()) {
          this.fechaInicio = inicio;
          this.fechaFin = fin;
          this.duracionCiclo = duracion;
          cicloEncontrado = true;
          break;
        }
  
        // Guardar el ciclo más reciente del mes anterior
        const diferenciaMeses = (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
        if (diferenciaMeses > 0 && diferenciaMeses < diferenciaMesesAnterior) {
          cicloAnterior = ciclo;
          diferenciaMesesAnterior = diferenciaMeses;
        }
      }
  
      // Si no se encontró ciclo actual, usar el del mes anterior más cercano
      if (!cicloEncontrado && cicloAnterior) {
        const parseDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split('-').map(Number);
          return new Date(year, month - 1, day);
        };
        this.fechaInicio = parseDate(cicloAnterior.Start_day);
        this.fechaFin = parseDate(cicloAnterior.Finish_day);
      }
  
      console.log('Fechas del ciclo cargadas:', {
        inicio: this.fechaInicio,
        fin: this.fechaFin
      });
  
    } catch (error) {
      console.error('Error al obtener fechas del ciclo:', error);
    } finally {
      // Establecer fechasCargadas después de 3-4 segundos
      setTimeout(() => {
        this.fechasCargadas = true;
        this.cdr.detectChanges();
      }, 4500); // 3.5 segundos de espera
    }
  }

  async mostrarAlertaCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que deseas cerrar sesión?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => this.logout() 
        }
      ]
    });
    await alert.present();    
  }


  estaEnPeriodo(): boolean {
    return this.indiceCiclo >= 1 && this.indiceCiclo <= 5;
  }

  estaEnDiaFertil(): boolean {
    return (this.indiceCiclo >= 9 && this.indiceCiclo <= 15) && this.indiceCiclo !== 14;
  }

  esDiaMasFertil(): boolean {
    return this.indiceCiclo === 14;
  }

  get diasParaInicioPeriodo(): number {
    if (this.estaEnPeriodo()) return 0;
    return this.duracionCiclo - this.indiceCiclo + 1;
  }

  get diasParaDiaFertil(): number {
    if (this.indiceCiclo < 14) {
      return 14 - this.indiceCiclo;
    }
    return 0;
  }

  getDiasDeRetraso(): number {
    if (!this.fechaFin) return 0;
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const ultimoDiaCiclo = new Date(this.fechaFin);
    ultimoDiaCiclo.setHours(0, 0, 0, 0);
    
    // Si ya pasó la fecha de fin del ciclo
    if (hoy > ultimoDiaCiclo) {
      const diffTime = Math.abs(hoy.getTime() - ultimoDiaCiclo.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    return 0;
  }

  getColorPeriodo(): string {
    if (this.getDiasDeRetraso() > 0) return '#E9E9E9';
    if (this.estaEnPeriodo()) return '#FFB7BF';
    if (this.esDiaMasFertil()) return '#FDD5AF';
    if (this.estaEnDiaFertil() || this.esUltimoDiaFertil()) return '#DFFDAF';
  
    //if (this.indiceCiclo < 14) return '#E9E9E9';
  
    if (this.indiceCiclo <= this.duracionCiclo) return '#FFCBD1';
  
    return 'transparent';
  }
   

  getTituloPeriodo(): string {
    if (this.getDiasDeRetraso() > 0) {
      return 'Retraso';
    }
    if (this.estaEnPeriodo() || this.esDiaMasFertil() || this.esUltimoDiaFertil()) {
      return 'Día';
    }
    return 'Faltan';
  }
  
  getSubtituloPeriodo(): string {
    if (this.getDiasDeRetraso() > 0) {
      return 'de tu periodo';
    }
    if (this.estaEnPeriodo()) {
      return 'de tu periodo';
    }
    if (this.esDiaMasFertil()) {
      return 'hoy es tu día más fértil';
    }
    if (this.esUltimoDiaFertil()) {
      return 'es tu último día fértil';
    }
    if (this.indiceCiclo < 14) {
      return 'para tu día más fértil';
    }
    return 'días para tu periodo';
  }

  esUltimoDiaFertil(): boolean {
    return this.indiceCiclo === 15;
  }
  
  getNumeroPeriodo(): number {
    const diasRetraso = this.getDiasDeRetraso();
    
    if (diasRetraso > 0) {
      return diasRetraso;
    }
    if (this.estaEnPeriodo() || this.esDiaMasFertil() || this.esUltimoDiaFertil()) {
      return this.indiceCiclo;
    }
    if (this.indiceCiclo < 14) {
      return this.diasParaDiaFertil;
    }
    return this.diasParaInicioPeriodo;
  } 

  getProbabilidadEmbarazo(): string {
    if (this.esDiaMasFertil()) return 'Alta probabilidad de quedar embarazada';
    if (this.estaEnDiaFertil()) return 'Media probabilidad de quedar embarazada';
    return 'Baja probabilidad de quedar embarazada';
  }

  getProbabilidadTexto(): string {
    if (this.indice === 14) return 'Alta';
    if (this.indice >= 9 && this.indice <= 15 && this.indice !== 14) return 'Media';
    return 'Baja';
  }
  
}
