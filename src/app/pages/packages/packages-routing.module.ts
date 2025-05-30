import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  PackagesListComponent } from './packages-list/packages-list.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [

  {
    path: "list",
    component: PackagesListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
