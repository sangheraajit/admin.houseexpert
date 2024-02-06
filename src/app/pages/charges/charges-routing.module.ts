import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  ChargesListComponent } from './charges-list/charges-list.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [

  {
    path: "list",
    component: ChargesListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargesRoutingModule { }
