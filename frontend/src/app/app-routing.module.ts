import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonEditComponent } from './components/people-edit/people-edit.component';

const routes: Routes = [
  { path: 'list', component: PeopleListComponent },
  { path: 'edit', component: PersonEditComponent },
  { path: 'edit/:id', component: PersonEditComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }