import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbCardModule,NbListModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
import { RatemstRoutingModule } from './ratemst-routing.module';
import { CftratemstAddEditComponent } from './cftratemst-add-edit/cftratemst-add-edit.component';
import { CftratemstListComponent } from './cftratemst-list/cftratemst-list.component';
import { FloorratemstListComponent } from './floorratemst-list/floorratemst-list.component';
import { FloorratemstAddEditComponent } from './floorratemst-add-edit/floorratemst-add-edit.component';


@NgModule({
  declarations: [
    CftratemstAddEditComponent,
    CftratemstListComponent,
    FloorratemstListComponent,
    FloorratemstAddEditComponent
  ],
  imports: [
    CommonModule,
    RatemstRoutingModule,
    CommonModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NbCardModule,
    NbListModule,
    FormsModule,
    UiSwitchModule,
    FileUploadModule,
    ToasterModule.forRoot(),
  ]
})
export class RatemstModule { }
