import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {

  profileImage: string = '../../../assets/img/registro/defaul-perfil.svg';

  // Variables para los selects
  selectedDay: number = 0; // Día actual por defecto
  selectedMonth: string = ''; // Inicializa la variable
  selectedYear: number = 0; // Año actual por defecto
  selectedLada: string = '';
  days: number[] = Array.from({ length: 31 }, (v, k) => k + 1); // Días 1-31
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = Array.from({ length: 124 }, (v, k) => k + 1900); // Años 1900-2023

  constructor() { }

  ngOnInit() {
    this.selectedLada = '+52';
  }

  // Función para cambiar la foto de perfil
  async changeProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos // Abre la galería
      });

      // Verificamos si image.dataUrl tiene un valor
      if (image && image.dataUrl) {
        this.profileImage = image.dataUrl;
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen: ', error);
    }
  }
}
