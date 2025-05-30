import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../auth/auth.guard";
// import { HomeserviceListComponent } from "./homeservice/homeservice-list/homeservice-list.component";
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   component: ECommerceComponent,
      // },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "eProviders",
        loadChildren: () =>
          import("./providers/providers.module").then((m) => m.ProvidersModule),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("./categories/categories.module").then(
            (m) => m.CategoriesModule),
      },
      {
        path: "service",
        loadChildren: () =>
          import("./homeservice/homeservice.module").then(
            (m) => m.HomeserviceModule),
      },
      {
        path: "artical",
        loadChildren: () =>
          import("./artical/artical.module").then(
            (m) => m.ArticalModule),
      },
      
      {
        path: "admin",
        loadChildren: () =>
          import("./admin/admin.module").then(
            (m) => m.AdminModule),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./orders/orders.module").then(
            (m) => m.OrdersModule),
      },
      {
        path: "charges",
        loadChildren: () =>
          import("./charges/charges.module").then(
            (m) => m.ChargesModule),
      },
      {
        path: "cftrate",
        loadChildren: () =>
          import("./ratemst/ratemst.module").then(
            (m) => m.RatemstModule),
      },
      {
        path: "packages",
        loadChildren: () =>
          import("./packages/packages.module").then(
            (m) => m.PackagesModule),
      },
      {
        path: "customer",
        loadChildren: () =>
          import("./customer/customer.module").then(
            (m) => m.CustomerModule),
      },
      // {
      //   path: 'forms',
      //   loadChildren: () => import('./forms/forms.module')
      //     .then(m => m.FormsModule),
      // },
      // {
      //   path: 'ui-features',
      //   loadChildren: () => import('./ui-features/ui-features.module')
      //     .then(m => m.UiFeaturesModule),
      // },
      // {
      //   path: 'modal-overlays',
      //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
      //     .then(m => m.ModalOverlaysModule),
      // },
      // {
      //   path: 'extra-components',
      //   loadChildren: () => import('./extra-components/extra-components.module')
      //     .then(m => m.ExtraComponentsModule),
      // },
      // {
      //   path: 'maps',
      //   loadChildren: () => import('./maps/maps.module')
      //     .then(m => m.MapsModule),
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./charts/charts.module')
      //     .then(m => m.ChartsModule),
      // },
      // {
      //   path: 'editors',
      //   loadChildren: () => import('./editors/editors.module')
      //     .then(m => m.EditorsModule),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () => import('./tables/tables.module')
      //     .then(m => m.TablesModule),
      // },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
      //     .then(m => m.MiscellaneousModule),
      // },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      // {
      //   path: '**',
      //   component: NotFoundComponent,
      // },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
