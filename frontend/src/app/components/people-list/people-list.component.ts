import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-list',
  template: `
    <div class="container">
      <h2>People List</h2>
      <button (click)="addNewPerson()" class="btn btn-primary mb-3">Add New Person</button>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let person of people">
            <td>{{ person.id }}</td>
            <td>{{ person.firstName }} {{ person.lastName }}</td>
            <td>{{ person.email }}</td>
            <td>
              <button (click)="editPerson(person)" class="btn btn-sm btn-warning mr-2">Edit</button>
              <button (click)="deletePerson(person)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];

  constructor(
    private peopleService: PeopleService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.getPeople().subscribe(
      people => this.people = people,
      error => console.error('Error loading people', error)
    );
  }

  editPerson(person: Person): void {
    this.router.navigate(['/edit', person.id]);
  }

  deletePerson(person: Person): void {
    this.peopleService.deletePerson(person.id).subscribe(
      () => {
        this.people = this.people.filter(p => p.id !== person.id);
      },
      error => console.error('Error deleting person', error)
    );
  }
  

  addNewPerson(): void {
    this.router.navigate(['/edit']);
  }
}