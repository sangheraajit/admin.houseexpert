import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { CityComponent } from './city/city.component';
import { CityAddEditComponent } from './city-add-edit/city-add-edit.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
import { RoleComponent } from './role/role.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
 


@NgModule({
  declarations: [
    UserComponent,
    CityComponent,
    CityAddEditComponent,
    UserAddEditComponent,
    RoleComponent,
    RoleAddEditComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
export class AdminModule { }
