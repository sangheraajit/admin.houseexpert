import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { AuthGuard } from "../../auth/auth.guard";
import { NbAccordionModule, NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSelectModule, NbTreeGridModule } from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

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
  imports: [
    NbLayoutModule, 
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    
    NbAccordionModule, 
    NbIconModule, 
    NbEvaIconsModule,
    NbButtonModule,
    RouterModule.forChild(routes)],
   

  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
