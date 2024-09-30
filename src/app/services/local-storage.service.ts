import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(token: string) {
    return localStorage.setItem('accessToken', token);
  }
 
  /**
   * Remove the access token from local storage.
   *
   */
  removeToken() {
    return localStorage.removeItem('accessToken');
  }

}
