import { Injectable,signal } from '@angular/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from '../components/header/wagmi.config';
import {  watchAccount } from '@wagmi/core';
import { environment } from '../../environment';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private readonly accountService: AccountService,private readonly router: Router,private readonly toastrService: ToastrService,private localStorageService: LocalStorageService) { }
  accountAddress = signal<string | null> (null);
  ifDisconnect = false;
  
  
  wagmiConfig() {
    const projectId = environment.WALLET_CONNECT_PROJECT_ID;
    const modal = createWeb3Modal({
      wagmiConfig: defaultWagmiConfig(wagmiConfig.config.metaData),
      projectId,
      themeMode: 'light',
      enableAnalytics: wagmiConfig.config.enableAnalytics, 
      themeVariables: wagmiConfig.config.themeVariables
    })
   

  }
  /**
   * An observable that emits the current wallet address as a string.
   * This is a readonly observable, so it will not emit any values until the wallet is connected.
   * @returns an observable of the current wallet address
   */
  get walletAddress() {
    return this.accountAddress.asReadonly();
  }

  /**
   * Check if the user is authenticated (i.e. connected to their wallet)
   * @returns true if the user is authenticated, false otherwise
   */
  isAuthendicated() {
    const wagmiAccount = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
    console.log('wagmiAccount',wagmiAccount);
    const isConnected = wagmiAccount?.state?.data?.account;  
    if (isConnected) {
      return   true;
    } else {
      return false;
    }
  }

  watchingAccount () {  
    return new Observable(observer => {
      watchAccount(async (account) => {
  
        if(account.address) {
          this.accountAddress.set(account.address);
          try{
            this.accountService.verifyAccountAccess(account.address).subscribe({
              next: (res) => {
                  this.localStorageService.setToken(res.data.session.session_token);
                  // this.router.navigate(['/admin-dashboard']);
                  this.ifDisconnect = false;
                  observer.next({success: true})
              },
              error: (error) => {
                this.toastrService.error('Please connect your wallet first');
                observer.error({success: false})
              }
            }
              
            )
          } catch (error) {
            this.toastrService.success('Please connect your wallet first');
          }
          
        } else {
          if(!this.ifDisconnect) {        
            this.toastrService.success('Wallet Succussfully Disconnected')
            this.accountService.logout().subscribe(
              (res) => {
                console.log('logout response',res);
              },
              (error) => {
                console.log('error',error);
              }
            );
            this.ifDisconnect = true
          }          
          observer.next({success: false})
        }
       
        
       });
    })
   

  }
  
}
