import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  phoneNumber: string = '';
  nombre: string = '';
  apellido: string = '';

  days: number[] = Array.from({ length: 31 }, (v, k) => k + 1);
  months: string[] = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
  years: number[] = Array.from({ length: 124 }, (v, k) => k + 1900);

  userId: string | null = null; // Se obtiene dinámicamente

  constructor(private apiService: ApiService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.selectedLada = '+52';
    this.obtenerUsuarioId();
  }

  // Obtener el ID del usuario desde localStorage
  obtenerUsuarioId() {
    const idGuardado = localStorage.getItem('usuarioId');
    if (idGuardado) {
      this.userId = idGuardado;
      console.log(this.userId);
    } else {
      console.error('No se encontró el ID del usuario en localStorage.');
    }
  }

  // Función para cambiar la foto de perfil
  async changeProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      if (image && image.webPath) {
        const blob = await fetch(image.webPath).then((res) => res.blob());
        const formData = new FormData();
        formData.append('image', blob, 'profile.jpg');

        this.apiService.uploadImage(formData).subscribe({
          next: (response) => {
            this.profileImage = response.imageUrl; // Guardar la URL devuelta por la API
          },
          error: (error) => {
            console.error('Error al subir la imagen:', error);
          }
        });
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen: ', error);
    }
  }


  // Función para actualizar el usuario
  updateUserData() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      return;
    }

    if (!this.phoneNumber.trim() || !this.selectedDay || !this.selectedMonth || !this.selectedYear) {
      console.error('Por favor, completa todos los campos requeridos.');

      return;
    }

    const birthdate = `${this.selectedYear}-${this.formatMonth(this.selectedMonth)}-${this.selectedDay}`;
    const data = {
      name: this.nombre,
      lastname: this.apellido,
      birthdate: birthdate,
      phone: `${this.selectedLada} ${this.phoneNumber}`,
      profile_image: this.profileImage
    };
    console.log("🔵 URL de la imagen antes de enviarla a la API:", this.profileImage);
    this.apiService.updateUsuario(this.userId, data).subscribe({
      next: async (response) => {
        console.log('Usuario actualizado exitosamente:', response);
        this.router.navigate(['/datos-guardados']);
      },
      error: async (error) => {
        console.error('Error al actualizar el usuario:', error);

        const toast = await this.toastController.create({
          message: 'Error al registrar. Intenta nuevamente.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      }
    });
  }

  // Función para formatear el mes en números
  private formatMonth(month: string): string {
    const monthIndex = this.months.indexOf(month);
    return monthIndex >= 0 ? (monthIndex + 1).toString().padStart(2, '0') : '01';
  }
}
