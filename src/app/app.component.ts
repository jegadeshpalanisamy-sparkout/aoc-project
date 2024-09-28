import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { WalletService } from './services/wallet.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'aoc-frontend';
  accountAddress: string | null = null;
  constructor(private walletService: WalletService) { }
 
  ngOnInit(): void {
    this.accountAddress = this.walletService.accountAddress();

  }

  
}
