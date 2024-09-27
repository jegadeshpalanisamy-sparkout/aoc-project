import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InitiativeService } from '../../services/initiative.service';


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

  constructor(
    private formBuilder: FormBuilder,
    private initiativeService: InitiativeService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.initiativeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      startDatetime: ['', Validators.required],
      endDatetime: ['', Validators.required],
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
        this.initiativeService.addInitiative(this.initiativeForm.value).subscribe(
          (response) => {
            this.router.navigate(['/admin-dashboard/initiatives']);
            console.log('Initiative added successfully', response);
            this.initiativeForm.reset();
          },
          (error) => {
            console.log('Error adding initiative', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
      this.initiativeForm.markAllAsTouched();
    }
  }

  get f() {
    return this.initiativeForm.controls;
  }

}
