import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InitiativesComponent } from "../initiatives/initiatives.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, InitiativesComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',

})
export class SidebarComponent {

}
