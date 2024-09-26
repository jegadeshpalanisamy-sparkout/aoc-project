import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Removes token
   * @returns
   */
  removeToken() {
    return localStorage.removeItem('accessToken');
  }

}
