import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { PackagesAddEditComponent } from './packages-add-edit/packages-add-edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbCardModule,NbTabsetModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
// import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    PackagesListComponent,
    PackagesAddEditComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NbCardModule,
    FormsModule,
    UiSwitchModule,
    FileUploadModule,NbTabsetModule,
    // MatTabsModule,
    ToasterModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PackagesModule { }

