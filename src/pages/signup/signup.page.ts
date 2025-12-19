import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    selector: 'app-signup',
    styleUrls: ['./signup.page.scss'],
    imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
    templateUrl: './signup.html'
})
export class SignupPage {

    otpSent = false;
    otpVerified = false;


    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        password: ['', Validators.required],
        otp: ['']
    });

    user = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        passwordHash: ''
    };


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastCtrl: ToastController
    ) { }



    sendOtp() {
        this.authService.sendOtp(this.form.value).subscribe(() => this.otpSent = true);
    }

    register() {
        this.authService.signup(this.user).subscribe({
            next: async () => {
                const toast = await this.toastCtrl.create({
                    message: 'Registration successful. Please verify your email.',
                    duration: 3000,
                    color: 'success'
                });
                toast.present();
            },
            error: async () => {
                const toast = await this.toastCtrl.create({
                    message: 'Registration failed',
                    duration: 3000,
                    color: 'danger'
                });
                toast.present();
            }
        });
    }
}