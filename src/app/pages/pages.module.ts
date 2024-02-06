import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
 

// import { ChargesListComponent } from './charges/charges-list/charges-list.component';
 
// import { HomeserviceListComponent } from './homeservice/homeservice-list/homeservice-list.component';
// import { HomeserviceAddEditComponent } from './homeservice-add-edit/homeservice-add-edit.component';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule, 
    // MiscellaneousModule,
  ],
  declarations: [PagesComponent,     ],
})
export class PagesModule {}
