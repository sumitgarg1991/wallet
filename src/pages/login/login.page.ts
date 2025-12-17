import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [IonicModule, CommonModule, FormsModule]
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