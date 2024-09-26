import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, DashboardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class NavbarComponent implements OnInit {

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.wagmiConfig();
  }
}
