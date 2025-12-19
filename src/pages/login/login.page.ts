import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage {
  form: FormGroup;

  email = '';
  password = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


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