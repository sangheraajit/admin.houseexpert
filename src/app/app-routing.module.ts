import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { LoginComponent } from "./login/login/login.component";

export const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  // {
  //   path: "auth",
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: "",
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: "login",
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: "register",
  //       component: NbRegisterComponent,
  //     },
  //     {
  //       path: "logout",
  //       component: NbLogoutComponent,
  //     },
  //     {
  //       path: "request-password",
  //       component: NbRequestPasswordComponent,
  //     },
  //     {
  //       path: "reset-password",
  //       component: NbResetPasswordComponent,
  //     },
  //   ],
  // },
  { path: "login",  component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
