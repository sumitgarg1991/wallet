import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; // <-- make sure this is imported
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        environment,
        BrowserModule,
        IonicModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        routes
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
