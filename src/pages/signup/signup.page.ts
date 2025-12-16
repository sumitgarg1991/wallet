import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastController } from '@ionic/angular';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html'
})
export class SignupPage {


    user = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        passwordHash: ''
    };


    constructor(
        private authService: AuthService,
        private toastCtrl: ToastController
    ) { }


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