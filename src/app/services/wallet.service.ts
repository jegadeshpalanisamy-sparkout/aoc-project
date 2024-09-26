import { Injectable,signal } from '@angular/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from '../components/header/wagmi.config';
import { switchNetwork, watchAccount, watchNetwork } from '@wagmi/core';
import { firstValueFrom, interval, Observable, takeUntil } from 'rxjs';
import { environment } from '../../environment';
import { AccountService } from './account.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private readonly accountService: AccountService,private readonly router: Router) { }
  accountAddress = signal<string | null> (null);
  
  wagmiConfig() {
    const projectId = environment.WALLET_CONNECT_PROJECT_ID;
    const modal = createWeb3Modal({
      wagmiConfig: defaultWagmiConfig(wagmiConfig.config.metaData),
      projectId,
      themeMode: 'light',
      enableAnalytics: wagmiConfig.config.enableAnalytics, 
      themeVariables: wagmiConfig.config.themeVariables
    })

    watchAccount(async (account) => {
      console.log('watch account');
      console.log('account',account);

      if(account.address) {
        this.accountAddress.set(account.address);
        this.accountService.verifyAccountAccess(account.address).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            // this.toastr.error(err.error.message);
            // console.log(err);

          }
        )
      } else {
        this.router.navigate(['']); // Navigate to the desired page (empty path)

      }
      // Create an observable that emits at a 10ms interval until the wagmi store is updated
      const wagmiStore$ = interval(10).pipe(
        takeUntil(
          new Observable(observer => {
            // Check if the wagmi store has the user's account address
            const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
            if (wagmiStore.state?.data?.account === account.address) {
              observer.next();
              observer.complete();
            }            
          })
        )
      );
       // Wait for the first value from the observable, or null if it completes without emitting
      //  await firstValueFrom(wagmiStore$, { defaultValue: null });
      //  // Get the wagmi store from local storage and parse it as JSON
      //  const wagmiAccount = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
      //  // Update the connector info with the user's account address
      //  (this.connectorInfo = wagmiAccount?.state?.data?.account) || this.localStorageService.removeToken();
      //  // // Update the wallet address in the dashboard service
      //  this.authService.updateWalletAddress(this.connectorInfo);     

      
     });

  }

  get walletAddress() {
    return this.accountAddress.asReadonly();
  }


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
}
