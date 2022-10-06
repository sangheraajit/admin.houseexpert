import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NbCardModule } from "@nebular/theme";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ThemeModule,
    NgxSpinnerModule,
    NbCardModule,
    FormsModule,
    ToasterModule.forRoot(),
  ],
  declarations: [LoginComponent, RegisterComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
