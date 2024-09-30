import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InitiativeService } from '../../services/initiative.service';
import { WalletService } from '../../services/wallet.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-initiative-actions',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './initiative-actions.component.html',
  styleUrl: './initiative-actions.component.css'
})
export class InitiativeActionsComponent {

  initiativeForm: FormGroup;
  isEditMode: boolean = false;
  initiativeId: string | null = null;
  walletAddress: string | null = null;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly initiativeService: InitiativeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute ,
    private readonly walletService: WalletService,
    private readonly toastrService: ToastrService
  ) {
    this.initiativeForm = this.formBuilder.group({
      initiative: ['', [Validators.required, Validators.minLength(3)]],
      start_period: ['', Validators.required],
      end_period: ['', Validators.required],
      identifier: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    // Check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      this.initiativeId = params.get('id'); // Get the initiative ID from the URL

      if (this.initiativeId) {
        this.isEditMode = true;
        this.loadInitiativeData(this.initiativeId); // Load existing data for editing
      }
    });
  }

  /**
   * Load existing initiative data for editing.
   * @param id The ID of the initiative to load.
   */
  loadInitiativeData(id: string) {
    this.initiativeService.getInitiativeById(id).subscribe(
      (data) => {
        this.initiativeForm.patchValue(data); // Populate form with the existing initiative data
      },
      (error) => {
        console.log('Error loading initiative data', error);
      }
    );
  }

  onSubmit() {
    if (this.initiativeForm.valid) {
      if (this.isEditMode) {
        // Edit initiative
        this.initiativeService.updateInitiative(this.initiativeId, this.initiativeForm.value).subscribe(
          (response) => {
            this.router.navigate(['/admin-dashboard/initiatives']);
            console.log('Initiative updated successfully', response);
          },
          (error) => {
            console.log('Error updating initiative', error);
          }
        );
      } else {
        // Add new initiative
        console.log('initiativeForm',this.initiativeForm.value);
        this.walletAddress = this.walletService.walletAddress();
        const data = {
          ...this.initiativeForm.value,
          wallet_address: this.walletAddress
        }                
        this.initiativeService.addInitiative(data).subscribe(
          (response) => {
            this.router.navigate(['/admin-dashboard/initiatives']);
            console.log('Initiative added successfully', response);
            this.initiativeForm.reset();
            this.toastrService.success('Initiative added successfully');
          },
          (error) => {
            console.log('Error adding initiative', error);
            this.toastrService.error('Error adding initiative');
          }
        );
      }
    } else {
      console.log('Form is invalid');
      this.initiativeForm.markAllAsTouched();
    }
  }

  /**
   * Get the initiative form controls
   * @returns Initiative form controls
   */
  get f() {
    return this.initiativeForm.controls;
  }

}
