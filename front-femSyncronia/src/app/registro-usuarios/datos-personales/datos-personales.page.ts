import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  profileImage: string = '../../../assets/img/registro/defaul-perfil.svg';

  // Variables para los selects
  selectedDay: number = 0;
  selectedMonth: string = '';
  selectedYear: number = 0;
  selectedLada: string = '';
  phoneNumber: string = ''; // Número de teléfono ingresado por el usuario

  days: number[] = Array.from({ length: 31 }, (v, k) => k + 1);
  months: string[] = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
  years: number[] = Array.from({ length: 124 }, (v, k) => k + 1900);

  userId: string = '1'; // ID del usuario para el ejemplo

  constructor(private apiService: ApiService) { }

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
        source: CameraSource.Photos,
      });

      if (image && image.dataUrl) {
        this.profileImage = image.dataUrl;
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen: ', error);
    }
  }

  // Función para actualizar el usuario
  updateUserData() {
    console.log('phoneNumber:', this.phoneNumber); // Verifica el teléfono
    console.log('selectedDay:', this.selectedDay); // Verifica el día
    console.log('selectedMonth:', this.selectedMonth); // Verifica el mes
    console.log('selectedYear:', this.selectedYear); // Verifica el año
  
    if (!this.phoneNumber.trim() || !this.selectedDay || !this.selectedMonth || !this.selectedYear) {
      console.error('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    const birthdate = `${this.selectedYear}-${this.formatMonth(this.selectedMonth)}-${this.selectedDay}`;
    const data = {
      phone: `${this.selectedLada} ${this.phoneNumber}`,
      birthdate: birthdate,
    };
  
    this.apiService.updateUsuario(this.userId, data).subscribe(
      (response) => {
        console.log('Usuario actualizado exitosamente:', response);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
  

  // Función para formatear el mes en números
  private formatMonth(month: string): string {
    const monthIndex = this.months.indexOf(month);
    return monthIndex >= 0 ? (monthIndex + 1).toString().padStart(2, '0') : '01';
  }
}
