import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { Assignment1Component } from './assignment1/assignment1.component';
import { Assignment2Component } from './assignment2/assignment2.component';
const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "assignment-1", component: Assignment1Component },
  { path: "assignment-2", component: Assignment2Component }
];

@NgModule({
  declarations: [
    IndexComponent,
    Assignment1Component,
    Assignment2Component
  ],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
