import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



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
  isSubmitting = false;

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
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    const { email, password } = this.form.value;

    this.authService.login({ email, password }).subscribe({
      next: async () => {
        this.isSubmitting = false;
        await (await this.toastCtrl.create({
          message: 'Login successful',
          duration: 2500,
          color: 'success'
        })).present();
        // Load profile from server and route
      },
      error: async () => {
        this.isSubmitting = false;
        await (await this.toastCtrl.create({
          message: 'Unable to sign in. Please try again.',
          duration: 2500,
          color: 'danger'
        })).present();
      }
    });
  }

  loginWithGoogle() {
    console.log('Google login clicked');
    // signInWithPopup(new GoogleAuthProvider())
    //   .then((res: { user: { getIdToken: () => any; }; }) => res.user.getIdToken())
    //   .then((token: string) => this.authService.socialLogin(token).subscribe());
  }

  loginWithFacebook() {
    console.log('Facebook login clicked');
  }

  forgotPassword() {
    console.log('Facebook login clicked');
  }

}