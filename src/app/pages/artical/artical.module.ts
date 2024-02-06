import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticalRoutingModule } from './artical-routing.module';
import { ArticalMasterListComponent } from './artical-master-list/artical-master-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
import { ArticlemstAddEditComponent } from './articlemst-add-edit/articlemst-add-edit.component';


@NgModule({
  declarations: [
    ArticalMasterListComponent,
    ArticlemstAddEditComponent
  ],
  imports: [
    CommonModule,
    ArticalRoutingModule,
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
export class ArticalModule { }
