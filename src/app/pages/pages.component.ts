import { Component, OnDestroy, OnInit } from '@angular/core'; // Import OnInit and OnDestroy
import { NbMenuItem } from '@nebular/theme'; // Import NbMenuItem for type safety
import { Subject } from 'rxjs'; // For managing subscriptions
import { takeUntil } from 'rxjs/operators'; // For managing subscriptions
import { MenuService } from '../@core/services/menu.service';



@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu> <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy { // Implement OnInit and OnDestroy

  menu: NbMenuItem[] = []; // Initialize as an empty array, will be populated dynamically
  private destroy$: Subject<void> = new Subject<void>(); // Subject to handle unsubscription

  constructor(private menuService: MenuService) { } // Inject your MenuService

  ngOnInit(): void {
    // Subscribe to the menuItems$ observable from your MenuService
    this.menuService.menuItems$
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribe when component is destroyed
      .subscribe(items => {
        this.menu = items; // Update the 'menu' property with the latest menu items
      });

    // Also trigger an initial menu load in case the user refreshes the page
    // This will fetch the menu based on the current localStorage state
    this.menuService.updateMenuBasedOnRoles();
  }

  ngOnDestroy(): void {
    // Ensure all subscriptions are cleaned up to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}