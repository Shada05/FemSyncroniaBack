import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PrimeraAperturaService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create(); // Esperar a que el storage esté listo

  }

  async verificar(): Promise<boolean> {
    const esPrimeraVez = await this.obtener();
    if (esPrimeraVez === null) {
      await this.asignar(true); // Si no hay valor, significa que es la primera vez
      return true;
    }
    return esPrimeraVez;
  }

  async obtener(): Promise<boolean | null> {
    if (!this._storage) await this.init(); // Asegurar que el storage esté listo
    return this._storage?.get('isFirstTime') ?? null;
  }

  async asignar(value: boolean): Promise<void> {
    if (!this._storage) await this.init();
    await this._storage?.set('isFirstTime', value);
  }

}
