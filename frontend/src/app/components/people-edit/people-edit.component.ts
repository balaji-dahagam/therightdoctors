import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-edit',
  template: `
    <div class="container">
      <h2>{{ isNewPerson ? 'Add New Person' : 'Edit Person' }}</h2>
      <form [formGroup]="personForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" formControlName="firstName" required>
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" formControlName="lastName" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" formControlName="email" required>
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="text" class="form-control" formControlName="phoneNumber">
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="personForm.invalid">
          {{ isNewPerson ? 'Add Person' : 'Update Person' }}
        </button>
        <button type="button" class="btn btn-secondary ml-2" (click)="cancel()">Cancel</button>
      </form>
    </div>
  `
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  isNewPerson = true;
  personId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.personId = +id;
        this.isNewPerson = false;
        this.loadPerson(this.personId);
      }
    });
  }

  loadPerson(id: number): void {
    this.peopleService.getPerson(id).subscribe(
      person => {
        this.personForm.patchValue(person);
      },
      error => console.error('Error loading person', error)
    );
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const person: Person = this.personForm.value;

      if (this.isNewPerson) {
        this.peopleService.createPerson(person).subscribe(
          () => this.router.navigate(['/list']),
          error => console.error('Error creating person', error)
        );
      } else {
        this.peopleService.updatePerson(person).subscribe(
          () => this.router.navigate(['/list']),
          error => console.error('Error updating person', error)
        );
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}