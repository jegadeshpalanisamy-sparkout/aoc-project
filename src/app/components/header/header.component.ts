import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, signal } from '@angular/core';
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
  accountAddress = signal<string | null> (null);

  // Define the @Output EventEmitter
  constructor(private readonly localStorageService: LocalStorageService,private readonly accountService: AccountService,private router: Router,private walletService: WalletService) { }

  ngOnInit(): void {
    this.wagmiConfiguration()
  }


  public wagmiConfiguration() {
    this.walletService.wagmiConfig();       
  }

  

   

}
