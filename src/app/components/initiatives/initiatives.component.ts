import { Component, OnInit } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { initiatives } from '../../interface/data-type';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-initiatives',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './initiatives.component.html',
  styleUrl: './initiatives.component.css'
})
export class InitiativesComponent implements OnInit{

  constructor(private initiativeService: InitiativeService) { }
  initiativesList: initiatives[] = [];
  ngOnInit(): void {
    this.getAllInitiatives();
  }

  getAllInitiatives() {
    this.initiativeService.getAllInitiatives().subscribe((data:initiatives[]) => {
      this.initiativesList = data;
    });
  }
}
