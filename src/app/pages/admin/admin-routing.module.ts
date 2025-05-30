import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { UserComponent } from "./user/user.component";
import { RoleComponent } from "./role/role.component";
// import {  UserroleComponent } from "./userrole/userrole.component";
import { AuthGuard } from "../../auth/auth.guard";
// import { AuthGuard } from "../../../../shared project with hamid sir/src/app/auth/auth.guard";

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "city",
  //   canActivate: [AuthGuard],
  // },
  {
    path: "city",
    component: CityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "role",
    component: RoleComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: "userrole",
  //   component: UserroleComponent,
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
