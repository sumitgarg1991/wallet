import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class LoginPage {


  email = '';
  password = '';


  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }


  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Login successful',
            duration: 3000,
            color: 'success'
          });
          toast.present();
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Invalid credentials or email not verified',
            duration: 3000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }
}