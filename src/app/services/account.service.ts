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
  verifyAccountAccess(address: any): Observable<any> {
    this.router.navigate(['/admin-dashboard']);
    return this.http.post(environment.API_BASE_URL + '/login', { address });
  }

}
