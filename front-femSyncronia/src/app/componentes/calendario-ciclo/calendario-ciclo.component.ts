import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

interface DiaCalendario {
  dia: number;
  tipo: string;
  indice?: number | null;
  intensidad?: number | null; // Changed back to synchronous
}

@Component({
  selector: 'app-calendario-ciclo',
  templateUrl: './calendario-ciclo.component.html',
  styleUrls: ['./calendario-ciclo.component.scss'],
})
export class CalendarioCicloComponent implements OnInit, OnChanges {
  @Input() mesActual: number = 0;
  @Input() anoActual: number = 0;
  @Input() fechaInicio: Date = new Date();
  @Input() fechaFin: Date = new Date();
  @Input() userId: string = '32';

  private destroy$ = new Subject<void>();

  diaSeleccionadoId: number | null = null;
  ciclosUsuario: any[] = [];
  @Output() diaSeleccionado = new EventEmitter<{
    diaActual: number;
    indice: number;
  }>();

  diasSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  diasMes: DiaCalendario[] = [];
  fechaActual: Date;
  private ciclosData: any[] = []; // Store cycles data

  constructor(private apiService: ApiService) {
    this.fechaActual = new Date();
  }

  async ngOnInit() {
    await this.cargarCiclos();
    this.actualizarCalendario();

    // Suscribirse a eventos de actualización
    this.apiService.cicloActualizado$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cargarYCargarCalendario();
      });
  }

  private async cargarYCargarCalendario() {
    await this.cargarCiclos();
    this.actualizarCalendario();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      await this.cargarCiclos();
    }
    if (
      changes['mesActual'] ||
      changes['anoActual'] ||
      changes['fechaInicio'] ||
      changes['fechaFin']
    ) {
      this.actualizarCalendario();
    }
  }

  private async cargarCiclos() {
    if (!this.userId) return;

    try {
      this.ciclosData = await this.apiService
        .mostrarCiclo(this.userId)
        .toPromise();
    } catch (error) {
      console.error('Error al obtener ciclos del usuario:', error);
      this.ciclosData = [];
    }
  }

  private obtenerIntensidadParaDia(dia: number): number | null {
    if (!this.userId || !this.ciclosData) return null;

    // Formatear fecha buscada como YYYY-MM-DD
    const fechaBuscadaStr = `${this.anoActual}-${(this.mesActual + 1)
      .toString()
      .padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    const cicloEncontrado = this.ciclosData.find((ciclo: any) => {
      if (!ciclo.date) return false;

      // Extraer solo la parte de fecha (YYYY-MM-DD) del string ISO
      const fechaCicloStr = ciclo.date.split('T')[0];
      return fechaBuscadaStr === fechaCicloStr;
    });

    return cicloEncontrado?.F_15 || null;
  }

  actualizarCalendario() {
    this.diasMes = [];
    const primerDiaMes = new Date(this.anoActual, this.mesActual, 1);
    const ultimoDiaMes = new Date(this.anoActual, this.mesActual + 1, 0);
    const primerDiaSemana = primerDiaMes.getDay();
    const ultimoDiaMesAnterior = new Date(
      this.anoActual,
      this.mesActual,
      0
    ).getDate();

    const diferenciaDias =
      Math.floor(
        (this.fechaFin.getTime() - this.fechaInicio.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    // Días del mes anterior
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      const dia = ultimoDiaMesAnterior - i;
      const fecha = new Date(this.anoActual, this.mesActual - 1, dia);
      const diffDias = Math.floor(
        (fecha.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const indice =
        (((diffDias % diferenciaDias) + diferenciaDias) % diferenciaDias) + 1;

      this.diasMes.push({
        dia: dia,
        tipo: 'anterior',
        indice: indice,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      const fecha = new Date(this.anoActual, this.mesActual, i);
      const diffDias = Math.floor(
        (fecha.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const indice =
        (((diffDias % diferenciaDias) + diferenciaDias) % diferenciaDias) + 1;

      this.diasMes.push({
        dia: i,
        tipo: 'actual',
        indice: indice,
        intensidad: this.obtenerIntensidadParaDia(i),
      });
    }

    // Días del mes siguiente
    for (let i = 1; this.diasMes.length < 42; i++) {
      const fecha = new Date(this.anoActual, this.mesActual + 1, i);
      const diffDias = Math.floor(
        (fecha.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const indice =
        (((diffDias % diferenciaDias) + diferenciaDias) % diferenciaDias) + 1;

      this.diasMes.push({
        dia: i,
        tipo: 'siguiente',
        indice: indice,
      });
    }

    // Buscar el día actual e índice
    const diaHoy = this.diasMes.find(
      (dia) =>
        dia.dia === this.fechaActual.getDate() &&
        dia.tipo === 'actual' &&
        this.mesActual === this.fechaActual.getMonth() &&
        this.anoActual === this.fechaActual.getFullYear()
    );

    if (diaHoy) {
      this.diaSeleccionado.emit({
        diaActual: diaHoy.dia,
        indice: diaHoy.indice ?? 1,
      });
    }
  }

  esHoy(diaObj: { dia: number; tipo: string }): boolean {
    const hoy = new Date();
    return (
      diaObj.dia === hoy.getDate() &&
      diaObj.tipo === 'actual' &&
      this.mesActual === hoy.getMonth() &&
      this.anoActual === hoy.getFullYear()
    );
  }

  seleccionarDia(diaObj: {
    dia: number;
    tipo: string;
    indice?: number | null;
  }) {
    if (diaObj.tipo !== 'actual') {
      return;
    }

    this.diaSeleccionadoId =
      diaObj.dia + this.mesActual * 100 + this.anoActual * 10000;

    this.diaSeleccionado.emit({
      diaActual: diaObj.dia,
      indice: diaObj.indice ?? 1,
    });
  }

  esDiaSeleccionado(diaObj: { dia: number; tipo: string }): boolean {
    const idDia = diaObj.dia + this.mesActual * 100 + this.anoActual * 10000;
    return this.diaSeleccionadoId === idDia && diaObj.tipo === 'actual';
  }
}
