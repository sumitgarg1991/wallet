import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class HomePage implements OnInit {
  customer: any = null;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer() {
    const headers = { Authorization: `Bearer ${this.auth.accessToken}` };

    this.http.get(`${environment.apiUrl}/api/customer/me`, { headers })
      .subscribe(
        res => this.customer = res,
        err => console.error(err)
      );
  }
}
