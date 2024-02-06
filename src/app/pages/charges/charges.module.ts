import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargesRoutingModule } from './charges-routing.module';
import { ChargesListComponent } from './charges-list/charges-list.component';
import { ChargesAddEditComponent } from './charges-add-edit/charges-add-edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbCardModule,NbListModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
 
@NgModule({
  declarations: [
    ChargesListComponent,
    ChargesAddEditComponent
  ],
  imports: [
    CommonModule,
    ChargesRoutingModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NbCardModule,
    NbListModule,
    FormsModule,
    UiSwitchModule,
    FileUploadModule,
    ToasterModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChargesModule { }


