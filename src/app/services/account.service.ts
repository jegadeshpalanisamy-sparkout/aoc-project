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

  // Method to verify account access by calling the API
  verifyAccountAccess(wallet_address: any): Observable<any> {
    
    return this.http.post(environment.API_BASE_URL+environment.ADMIN_URL + '/login', { wallet_address });
  }

  /**
   * Log out of the app by making a DELETE request to the API logout endpoint.
   * @returns An Observable of the response from the API.
   */
  logout() {
    return this.http.delete(environment.API_BASE_URL+environment.ADMIN_URL + '/logout');
  }

}
