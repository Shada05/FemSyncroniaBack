import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  profileImage: string = '../../../assets/img/registro/defaul-perfil.svg';
  selectedImage: Blob | null = null;

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

  userId: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private auth: AuthService,
    private actionSheetController: ActionSheetController,
    private utilidadesService: UtilidadesService
  ) { }

  ngOnInit() {
    this.selectedLada = '+52';
    this.obtenerUsuarioId();
  }

  async obtenerUsuarioId() {
    const token = await this.auth.obtenerToken();
    if (token) {
      this.auth.verificarToken(token).subscribe(
        (response) => {
          this.userId = response.user.id;
          console.log('ID obtenido del token:', this.userId);
        },
        (error) => {
          console.log('Error al obtener el ID:', error);
        }
      );
    } else {
      console.log('No hay token almacenado.');
    }
  }

  async changeProfilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          },
        },
        {
          text: 'Seleccionar de la galería',
          icon: 'image',
          handler: () => {
            this.selectFromGallery();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (image && image.webPath) {
        const blob = await fetch(image.webPath).then((res) => res.blob());
        this.selectedImage = blob;
        this.profileImage = image.webPath;
        console.log('Foto tomada correctamente.');
      } else {
        console.log('No se tomó ninguna foto.');
      }
    } catch (error) {
      console.log('Error al tomar la foto: ', error);
      await this.utilidadesService.mostrarToastAdvertencia('Error al tomar la foto');
    }
  }

  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      if (image && image.webPath) {
        const blob = await fetch(image.webPath).then((res) => res.blob());
        this.selectedImage = blob;
        this.profileImage = image.webPath;
        console.log('Imagen seleccionada correctamente.');
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen: ', error);
      await this.utilidadesService.mostrarToastAdvertencia('Error al seleccionar la imagen');
    }
  }

  async updateUserData() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      await this.utilidadesService.mostrarToastAdvertencia('Error: No se puede actualizar sin un ID de usuario.');
      return;
    }

    if (!this.phoneNumber.trim() || !this.selectedDay || !this.selectedMonth || !this.selectedYear) {
      console.error('Por favor, completa todos los campos requeridos.');
      await this.utilidadesService.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos.');
      return;
    }

    try {
      await this.utilidadesService.mostrarLoading('Actualizando datos...');

      const birthdate = `${this.selectedYear}-${this.formatMonth(this.selectedMonth)}-${this.selectedDay}`;
      const data = {
        name: this.nombre,
        lastname: this.apellido,
        birthdate: birthdate,
        phone: `${this.selectedLada} ${this.phoneNumber}`,
        profile_image: this.profileImage,
      };

      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('image', this.selectedImage, 'profile.jpg');

        try {
          const response = await this.apiService.uploadImage(formData).toPromise();

          if (response && response.imageUrl) {
            data.profile_image = response.imageUrl;
            console.log('Imagen subida correctamente. URL:', data.profile_image);
          } else {
            console.error('Error: La respuesta de la API no contiene la URL de la imagen.');
            await this.utilidadesService.ocultarLoading();
            await this.utilidadesService.mostrarToastAdvertencia('Error al subir la imagen');
            return;
          }
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Error al subir la imagen');
          return;
        }
      }

      this.apiService.updateUsuario(this.userId, data).subscribe({
        next: async (response) => {
          console.log('Usuario actualizado exitosamente:', response);
          await this.utilidadesService.ocultarLoading();
          this.router.navigate(['/datos-guardados']);
        },
        error: async (error) => {
          console.error('Error al actualizar el usuario:', error);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Error al actualizar los datos. Intenta nuevamente.');
        },
      });
    } catch (error) {
      console.error('Error inesperado:', error);
      await this.utilidadesService.ocultarLoading();
      await this.utilidadesService.mostrarToastAdvertencia('Error inesperado. Intenta nuevamente.');
    }
  }

  private formatMonth(month: string): string {
    const monthIndex = this.months.indexOf(month);
    return monthIndex >= 0 ? (monthIndex + 1).toString().padStart(2, '0') : '01';
  }

  validatePhoneNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value;
    this.phoneNumber = value;
  }
}