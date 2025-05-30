import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {   CftratemstListComponent } from './cftratemst-list/cftratemst-list.component';
import {    FloorratemstListComponent } from './floorratemst-list/floorratemst-list.component';
import { AuthGuard } from '../../auth/auth.guard';
const routes: Routes = [
  {
    path: "list",
    component: CftratemstListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "floorlist",
    component: FloorratemstListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatemstRoutingModule { }
