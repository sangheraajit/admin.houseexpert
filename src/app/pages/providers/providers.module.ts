import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProvidersRoutingModule } from "./providers-routing.module";
import { ProviderTypesListComponent } from "./provider-types-list/provider-types-list.component";
import { ProvidersListComponent } from "./providers-list/providers-list.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbTabsetModule,
} from "@nebular/theme";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToasterModule } from "angular2-toaster";
import { ProviderAddEditComponent } from "./provider-add-edit/provider-add-edit.component";
import { FormsModule } from "@angular/forms";
import { ProviderTypesAddEditComponent } from "./provider-types-add-edit/provider-types-add-edit.component";
import { UiSwitchModule } from "ngx-ui-switch";
import { FileUploadModule } from "ng2-file-upload";
import { ProviderRequestListComponent } from './provider-request-list/provider-request-list.component';
import { ProviderRequestAddEditComponent } from './provider-request-add-edit/provider-request-add-edit.component';
@NgModule({
  declarations: [
    ProviderTypesListComponent,
    ProvidersListComponent,
    ProviderAddEditComponent,
    ProviderTypesAddEditComponent,
    ProviderRequestListComponent,
    ProviderRequestAddEditComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NbCardModule,
    FormsModule,
    ProvidersRoutingModule,
    UiSwitchModule,
    FileUploadModule,
    NbTabsetModule,
    ToasterModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProvidersModule {}
