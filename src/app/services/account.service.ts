import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,private router: Router) { }
  adminUrl = '/api/v1/admin';

  // Method to verify account access by calling the API
  verifyAccountAccess(wallet_address: any): Observable<any> {
    return this.http.post(environment.API_BASE_URL+this.adminUrl + '/login', { wallet_address });
  }

}
