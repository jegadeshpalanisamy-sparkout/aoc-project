import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';

export const authGuard: CanActivateFn = (route, state) => {
  const walletService = inject(WalletService);
  const router = inject(Router); 
   
  if (walletService.isAuthendicated()) {
    return true; 
  } else {
    router.navigate(['']);
    return false; 
  }
};


