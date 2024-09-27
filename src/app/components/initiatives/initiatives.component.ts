import { Component, OnInit } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { initiatives } from '../../interface/data-type';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-initiatives',
  standalone: true,
  imports: [CommonModule, DashboardComponent,RouterModule],
  templateUrl: './initiatives.component.html',
  styleUrl: './initiatives.component.css'
})
export class InitiativesComponent implements OnInit{
  initiativeIdToDelete: string | null = null;
  constructor(private initiativeService: InitiativeService) { }
  initiativesList: initiatives[] = [];
  ngOnInit(): void {
    this.getAllInitiatives();
  }

  getAllInitiatives() {
    this.initiativeService.getAllInitiatives().subscribe((data:initiatives[]) => {
      this.initiativesList = data;
      console.log('initiativesList',this.initiativesList);
    });
  }

 // Opens the delete modal and stores the initiative ID to delete
 public openDeleteModal(id: string,event: Event): void {
    event.preventDefault();
    this.initiativeIdToDelete = id;
    const deleteModal = document.getElementById('deleteModal');
      if (deleteModal) {
      deleteModal.classList.remove('hidden');
    }
  }


   // Closes the delete modal
  public closeDeleteModal(): void {
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      deleteModal.classList.add('hidden');
    }
    this.initiativeIdToDelete = null;
  }

   // Confirms the delete operation
   public confirmDelete(): void {
    if (!this.initiativeIdToDelete) {
      return;
    }

    this.deleteInitiative(this.initiativeIdToDelete);
    this.closeDeleteModal();
  }



public deleteInitiative(deleteInitiative: string): void {  
  this.initiativeService.deleteInitiative(deleteInitiative).subscribe(
    (response) => {
      console.log('Initiative deleted successfully', response);
      this.getAllInitiatives();
    },
    (error) => {  
      console.log('Error deleting initiative', error);
    }
  );
}

}
