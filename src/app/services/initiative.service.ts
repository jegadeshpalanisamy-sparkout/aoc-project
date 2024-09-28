import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initiatives } from '../interface/data-type';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(private http: HttpClient) { }

/**
 * get all initiatives
 * @returns All initiatives
//  */
  getInitiative(page: number, limit: number): Observable<initiatives[]> {
    return this.http.get<initiatives[]>(`${environment.API_BASE_URL+environment.ADMIN_URL}/list-initiatives?page=${page}&limit=${limit}&search=`);
  } 

  
  /**
   * Creates a new initiative with the given data.
   * @param data The new initiative details
   * @returns The new initiative
   */
  addInitiative(data: initiatives) {
    return this.http.post(`${environment.API_BASE_URL+environment.ADMIN_URL}/create-initiative`, data);
  }

  /**
   * Gets a single initiative with the given ID
   * @param id The ID of the initiative to get
   * @returns The initiative with the given ID
   */
  getInitiativeById(id: string) {
    return this.http.get(`${environment.API_BASE_URL+environment.ADMIN_URL}/initiatives/${id}`);
  }

  /**
   * Updates an existing initiative with the given data.
   * @param id The ID of the initiative to update
   * @param data The updated initiative details
   * @returns The updated initiative
   */
  updateInitiative(id: string | null, data: initiatives) {
    return this.http.put(`${environment.API_BASE_URL+environment.ADMIN_URL}/initiatives/${id}`, data);
  }

  /**
   * Deletes an initiative with the given ID
   * @param id The ID of the initiative to delete
   * @returns The deleted initiative
   */
  deleteInitiative(id: string | null) {
    return this.http.delete(`${environment.API_BASE_URL+environment.ADMIN_URL}/initiatives/${id}`);
  }


}
