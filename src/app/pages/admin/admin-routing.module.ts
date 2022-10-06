import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { UserComponent } from "./user/user.component";
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
