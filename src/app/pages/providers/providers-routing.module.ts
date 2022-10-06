import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProviderTypesListComponent } from "./provider-types-list/provider-types-list.component";
import { ProvidersListComponent } from "./providers-list/providers-list.component";
import { AuthGuard } from "../../auth/auth.guard";
import { ProviderRequestListComponent } from './provider-request-list/provider-request-list.component';
// import { ProviderAddEditComponent } from "./provider-add-edit/provider-add-edit.component";

const routes: Routes = [
  {
    path: "types",
    component: ProviderTypesListComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: "add-edit",
  //   component: ProviderAddEditComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: "list",
    component: ProvidersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "request-list",
    component: ProviderRequestListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersRoutingModule {}
