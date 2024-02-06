import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  OrderListComponent } from "./order-list/order-list.component";
import {   OrderViewComponent } from "./order-view/order-view.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list",
    component: OrderListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view",
    component: OrderViewComponent,
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
