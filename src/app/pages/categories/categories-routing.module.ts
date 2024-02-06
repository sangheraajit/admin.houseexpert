import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: "list",
  //   component: ProvidersListComponent,
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
