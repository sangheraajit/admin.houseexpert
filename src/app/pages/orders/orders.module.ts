// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { OrdersRoutingModule } from './orders-routing.module';
// import { OrderListComponent } from './order-list/order-list.component';
// import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

// @NgModule({
//   declarations: [
//     OrderListComponent,
//     OrderAddEditComponent
//   ],
//   imports: [
//     CommonModule,
//     OrdersRoutingModule
//   ]
// })
// export class OrdersModule { }
import { ThemeModule } from '../../@theme/theme.module';
 
import { StatusCardComponent } from './status-card/status-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';
import { UiSwitchModule } from "ngx-ui-switch";
import { ToasterModule } from "angular2-toaster";
import { FormsModule } from "@angular/forms";
import { NbCardModule } from "@nebular/theme";
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { OrderViewComponent } from './order-view/order-view.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectPackageComponent } from './select-package/select-package.component';

@NgModule({
  declarations: [OrderListComponent,
    OrderAddEditComponent,StatusCardComponent,
    OrderViewComponent,SelectPackageComponent,
    MultiSelectComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NbCardModule,
    FormsModule,
    UiSwitchModule,ThemeModule,
    ToasterModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersModule {}

