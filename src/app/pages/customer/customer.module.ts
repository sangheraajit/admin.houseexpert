import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import { CustomerRoutingModule } from './customer-routing.module';


@NgModule({
  declarations: [
   CustomerListComponent,
    CustomerAddEditComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
export class CustomerModule { }
