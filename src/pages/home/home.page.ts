import { Component, OnInit } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html'
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
