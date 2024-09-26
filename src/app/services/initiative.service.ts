import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initiatives } from '../interface/data-type';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(private http: HttpClient) { }


  getAllInitiatives() {   
    return this.http.get<initiatives[]>('https://x633tk8l-3000.inc1.devtunnels.ms/api/initiatives');

  }
    
}
