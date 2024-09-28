import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

 
  /**
   * Remove the access token from local storage.
   *
   */
  removeToken() {
    return localStorage.removeItem('accessToken');
  }

}
