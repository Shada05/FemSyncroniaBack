import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup;
  passwordVisible = false;
  mostrarIcono = false;
  isLoading = false;
  isToastOpen = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    // Inicialización del formulario con validadores
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Suscripción a cambios en el campo de contraseña para mostrar/ocultar icono
    this.formulario.get('password')?.valueChanges.subscribe(value => {
      this.mostrarIcono = value?.trim() !== '';
    });
  }

  /**
   * Muestra un toast de advertencia
   * @param mensaje Mensaje a mostrar
   */
  private async mostrarToastAdvertencia(mensaje: string) {
    if (this.isToastOpen) return;

    this.isToastOpen = true;
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });

    toast.onDidDismiss().then(() => {
      this.isToastOpen = false;
    });

    await toast.present();
  }

  /**
   * Maneja el proceso de login
   */
  async login() {
    if (this.formulario.invalid) {
      this.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos.');
      return;
    }
    
    if (this.isLoading) return;
    this.isLoading = true;

    const loading = await this.loadingController.create({
      message: 'Enviando datos...',
      spinner: 'crescent',
    });
    
    await loading.present();

    try {
      const { email, password } = this.formulario.value;
      const response = await lastValueFrom(this.authService.login(email, password));

      if (response?.token) {
        await this.authService.guardarToken(response.token);
        this.navCtrl.navigateRoot('/pantalla-principal');
      } else {
        this.mostrarToastAdvertencia('Error: No se recibió un token válido.');
      }
    } catch (error: any) {
      this.handleLoginError(error);
    } finally {
      await loading.dismiss();
      this.isLoading = false;
    }
  }

  /**
   * Maneja los errores de login
   * @param error Error recibido
   */
  private handleLoginError(error: any) {
    if (!error.error?.message) {
      this.mostrarToastAdvertencia('Error desconocido al intentar iniciar sesión');
      return;
    }

    if (error.error.message === 'Usuario no encontrado.') {
      this.formulario.get('email')?.setErrors({ usuarioNoEncontrado: true });
    } else if (error.error.message === 'Contraseña incorrecta.') {
      this.formulario.get('password')?.setErrors({ contrasenaIncorrecta: true });
    }
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  alternarVisibilidadContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }

  alternarIcono() {
    const passwordControl = this.formulario.get('password');
    this.mostrarIcono = passwordControl?.value?.trim() !== '';
  }
}