// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class HomeserviceRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {  HomeserviceListComponent } from "./homeservice-list/homeservice-list.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: "list",
    component: HomeserviceListComponent,
    canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeserviceRoutingModule {}

