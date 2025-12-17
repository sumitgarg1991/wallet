import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';

@NgModule({
  declarations: [SignupPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class SignupPageModule {}