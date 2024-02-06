// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { HomeserviceRoutingModule } from './homeservice-routing.module';
// import { HomeserviceAddEditComponent } from './homeservice-add-edit/homeservice-add-edit.component';
// import {  HomeserviceListComponent } from './homeservice-list/homeservice-list.component';

// @NgModule({
//   declarations: [
//     HomeserviceAddEditComponent,
//     HomeserviceListComponent
//   ],
//   imports: [
//     CommonModule,
//     HomeserviceRoutingModule
//   ]
// })
// export class HomeserviceModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeserviceRoutingModule } from "./homeservice-routing.module";
import { HomeserviceAddEditComponent } from "./homeservice-add-edit/homeservice-add-edit.component";
import { HomeserviceListComponent } from "./homeservice-list/homeservice-list.component";
import { UiSwitchModule } from "ngx-ui-switch";
import { ToasterModule } from "angular2-toaster";
import { FormsModule } from "@angular/forms";
import { NbCardModule } from "@nebular/theme";
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FileUploadModule } from "ng2-file-upload";
import { RateMasterComponent } from './rate-master/rate-master.component';

@NgModule({
  declarations: [HomeserviceAddEditComponent, HomeserviceListComponent, RateMasterComponent],
  imports: [
    CommonModule,
    HomeserviceRoutingModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NbCardModule,
    FormsModule,
    UiSwitchModule,
    FileUploadModule,
    ToasterModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeserviceModule {}
