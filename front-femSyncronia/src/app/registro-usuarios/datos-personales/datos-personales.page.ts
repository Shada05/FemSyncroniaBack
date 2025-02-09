import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  profileImage: string = '../../../assets/img/registro/defaul-perfil.svg';
  selectedImage: Blob | null = null; // Variable temporal para almacenar la imagen seleccionada

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
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.selectedLada = '+52';
    this.obtenerUsuarioId();
  }

  // Obtener el ID del usuario desde localStorage
  async obtenerUsuarioId() {
    const token = await this.auth.obtenerToken();
    if (token) {
      this.auth.verificarToken(token).subscribe(response => {
        this.userId = response.user.id;
        console.log('ID obtenido del token:', this.userId);
      }, error => {
        console.log('Error al obtener el ID:', error);
      });
    } else {
      console.log('No hay token almacenado.');
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
        this.selectedImage = blob; // Almacenar la imagen seleccionada temporalmente
        this.profileImage = image.webPath; // Mostrar la imagen seleccionada en la vista
        console.log('Imagen seleccionada correctamente.');
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen: ', error);
    }
  }

// Función para actualizar el usuario
async updateUserData() {
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
    profile_image: this.profileImage // URL de la imagen por defecto o la que ya estaba
  };

  // Si hay una imagen seleccionada, la subimos primero
  if (this.selectedImage) {
    const formData = new FormData();
    formData.append('image', this.selectedImage, 'profile.jpg');

    try {
      const response = await this.apiService.uploadImage(formData).toPromise();
      
      // Verificamos si la respuesta es válida
      if (response && response.imageUrl) {
        data.profile_image = response.imageUrl; // Actualizamos la URL de la imagen en los datos del usuario
        console.log('Imagen subida correctamente. URL:', data.profile_image);
      } else {
        console.error('Error: La respuesta de la API no contiene la URL de la imagen.');
        return;
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return;
    }
  }

  // Actualizar los datos del usuario
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