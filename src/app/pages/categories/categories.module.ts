import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { UiSwitchModule } from "ngx-ui-switch";
import { ToasterModule } from "angular2-toaster";
import { FormsModule } from "@angular/forms";
import { NbCardModule } from "@nebular/theme";
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CategoriesAddEditComponent } from "./categories-add-edit/categories-add-edit.component";
import { FileUploadModule } from "ng2-file-upload";
@NgModule({
  declarations: [CategoriesListComponent, CategoriesAddEditComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
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
export class CategoriesModule {}
