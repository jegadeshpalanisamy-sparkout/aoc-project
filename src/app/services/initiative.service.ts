import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initiatives } from '../interface/data-type';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(private http: HttpClient) { }


  getAllInitiatives() {   
    // return this.http.get<initiatives[]>(environment.API_BASE_URL+environment.ADMIN_URL+'/list-initiatives?page=1&limit=5&search=');
    return this.http.get<initiatives[]>(`${environment.API_BASE_URL+environment.ADMIN_URL}/list-initiatives?page=1&limit=5&search=`);

  }   

  addInitiative(data: initiatives) {
    //  return this.http.post(environment.API_BASE_URL+environment.ADMIN_URL+'/create-initiative', data);
    return this.http.post(`${environment.API_BASE_URL+environment.ADMIN_URL}/create-initiative`, data);
  }

  getInitiativeById(id: string) {
    return this.http.get(`${environment.API_BASE_URL+environment.ADMIN_URL}/initiatives/${id}`);
  }

  updateInitiative(id: string | null, data: initiatives) {
    return this.http.put(`${environment.API_BASE_URL+environment.ADMIN_URL}/initiatives/${id}`, data);
  }

  deleteInitiative(id: string | null) {
    return this.http.delete(`${environment.API_BASE_URL+environment.ADMIN_URL}/initiatives/${id}`);
  }
}
