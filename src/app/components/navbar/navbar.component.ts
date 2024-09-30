import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, DashboardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class NavbarComponent implements OnInit {

  constructor(private walletService: WalletService,private readonly toastrService: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.wagmiConfiguration()
  }

  /**
   * Wagmi Configuration
   */
  public wagmiConfiguration() {
    this.walletService.wagmiConfig(); 
    this.walletService.watchingAccount().subscribe({
      next : (res: any) => {
        if(res.success) {
          this.router.navigate(['/admin-dashboard/initiatives']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error : (error) => {
        this.toastrService.error('Please connect your wallet first');
      }
  });   
  }
}
