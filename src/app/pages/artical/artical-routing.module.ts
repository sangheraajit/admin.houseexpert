import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticalMasterListComponent } from './artical-master-list/artical-master-list.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [

  {
    path: "list",
    component: ArticalMasterListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticalRoutingModule { }
