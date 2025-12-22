import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HomePage } from 'src/pages/home/home.page';
import { LoginPage } from 'src/pages/login/login.page';
import { SignupPage } from 'src/pages/signup/signup.page';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent, SignupPage, LoginPage, HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  bootstrap: [AppComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class AppModule { }