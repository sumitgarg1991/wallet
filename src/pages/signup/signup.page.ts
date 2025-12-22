import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { PhoneNumberUtil } from 'google-libphonenumber';


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
    phoneUtil = PhoneNumberUtil.getInstance();

    countries = [
        { name: 'Singapore', dialCode: '+65', flag: 'SG' },
        { name: 'India', dialCode: '+91', flag: 'IN' },
        { name: 'United States', dialCode: '+1', flag: 'US' },
        { name: 'United Kingdom', dialCode: '+44', flag: 'GB' },
        // add more as needed
    ];

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        countryCode: ['', Validators.required],
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

    validatePhone(): boolean {
        try {
            const code: any = this.form.value.countryCode;
            const mobile: any = this.form.value.mobile;
            const number = this.phoneUtil.parse(mobile, this.getRegionFromCode(code));
            return this.phoneUtil.isValidNumber(number);
        } catch {
            return false;
        }
    }

    getRegionFromCode(code: string): string {
        switch (code) {
            case '+65': return 'SG';
            case '+91': return 'IN';
            case '+1': return 'US';
            case '+44': return 'GB';
            default: return 'SG';
        }
    }


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

    signupWithGoogle() {
        console.log('Google login clicked');
        // signInWithPopup(new GoogleAuthProvider())
        //   .then((res: { user: { getIdToken: () => any; }; }) => res.user.getIdToken())
        //   .then((token: string) => this.authService.socialLogin(token).subscribe());
    }

    signupWithFacebook() {
        console.log('Facebook login clicked');
    }

}