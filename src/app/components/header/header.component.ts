import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environment';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from './wagmi.config';
import { switchNetwork, watchAccount, watchNetwork } from '@wagmi/core';
import { firstValueFrom, interval, Observable, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit{
  connectorInfo: any;
  isLoading = false;
  // Define the @Output EventEmitter
  constructor(private readonly localStorageService: LocalStorageService,private readonly accountService: AccountService,private router: Router,private walletService: WalletService) { }

  ngOnInit(): void {
    this.wagmiConfiguration()
  }


  public wagmiConfiguration() {
    this.walletService.wagmiConfig();
    // const projectId = environment.WALLET_CONNECT_PROJECT_ID;
    // const modal = createWeb3Modal({
    //   wagmiConfig: defaultWagmiConfig(wagmiConfig.config.metaData),
    //   projectId,
    //   themeMode: 'light',
    //   enableAnalytics: wagmiConfig.config.enableAnalytics, 
    //   themeVariables: wagmiConfig.config.themeVariables
    // })
    // this.router.navigate(['/admin-dashboard']);

    // watchAccount(async (account) => {
    //   console.log('watch account');
    //   console.log('account',account);

    //   if(account.address) {
    //     this.accountAddress.emit(account.address);

    //     this.accountService.verifyAccountAccess(account.address).subscribe(
    //       (res) => {
            
    //       })
    //   }
      // Create an observable that emits at a 10ms interval until the wagmi store is updated
      // const wagmiStore$ = interval(10).pipe(
      //   takeUntil(
      //     new Observable(observer => {
      //       // Check if the wagmi store has the user's account address
      //       const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
      //       if (wagmiStore.state?.data?.account === account.address) {
      //         observer.next();
      //         observer.complete();
      //       }            
      //     })
      //   )
      // );
       // Wait for the first value from the observable, or null if it completes without emitting
      //  await firstValueFrom(wagmiStore$, { defaultValue: null });
      //  // Get the wagmi store from local storage and parse it as JSON
      //  const wagmiAccount = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
      //  // Update the connector info with the user's account address
      //  (this.connectorInfo = wagmiAccount?.state?.data?.account) || this.localStorageService.removeToken();
      //  // // Update the wallet address in the dashboard service
      //  this.authService.updateWalletAddress(this.connectorInfo);

      

      
    //  });

    
  }

   

}
