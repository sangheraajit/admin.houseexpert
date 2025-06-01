/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,NbTabsetModule,
  NbTreeGridModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
  NbAccordionModule,
  NbIconModule,
  NbTimepickerModule
} from "@nebular/theme";
import { LoginModule } from "./login/login.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from "./auth/auth.guard";
import { APP_BASE_HREF } from "@angular/common";
import { httpInterceptorProviders } from "./services/interceptor";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { GooglePlacesComponent } from "./@theme/components/google-places/google-places.component";
// import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    NgxSpinnerModule, NbTabsetModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbTreeGridModule,
    NbLayoutModule, 
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    NbTreeGridModule, 
    NbAccordionModule, 
    NbIconModule, 
    NbEvaIconsModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
  ],
  providers: [httpInterceptorProviders, AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
