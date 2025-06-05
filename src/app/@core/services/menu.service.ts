import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _menuItems: BehaviorSubject<NbMenuItem[]> = new BehaviorSubject<NbMenuItem[]>([]);
  public readonly menuItems$: Observable<NbMenuItem[]> = this._menuItems.asObservable();

  constructor() {
    // Optionally, load menu on service initialization (e.g., on app load)
    this.updateMenuBasedOnRoles();
  }

  /**
   * Generates and updates the menu items based on the 'menulist' in local storage.
   */
  updateMenuBasedOnRoles(): void {
    const temp1 = localStorage.getItem('menulist');
    const menulist: string[] = temp1 ? temp1.split(',') : [];

    const findRole = (pagename: string): boolean => {
      return menulist.includes(pagename);
    };

    const dynamicMenuItems: NbMenuItem[] = [
      {
        title: 'Dashboard',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: 'App Management',
        group: true,
      },
      {
        title: 'Providers',
        icon: 'layout-outline',
        hidden: !findRole('Providers'),
        children: [
          {
            title: 'Provider Types',
            link: '/pages/eProviders/types',
          },
          {
            title: 'Providers',
            link: '/pages/eProviders/list',
          },
          {
            title: 'Providers Requests',
            link: '/pages/eProviders/request-list',
          },
        ],
      },
      {
        title: 'Categories',
        icon: 'home-outline',
        link: '/pages/categories',
        hidden: !findRole('Categories'),
      },
      {
        title: 'Customer',
        icon: 'home-outline',
        link: '/pages/customer/list',
        hidden: !findRole('Customer'),
      },
      {
        title: 'Bookings',
        icon: 'home-outline',
        link: '/pages/orders',
        hidden: !findRole('Bookings'),
      },
      {
        title: 'Article',
        icon: 'home-outline',
        link: '/pages/artical/list',
        hidden: !findRole('Article'),
      },
      {
        title: 'Floor Rate',
        icon: 'home-outline',
        link: '/pages/cftrate/floorlist',
        hidden: !findRole('Floor Rate'),
      },
      {
        title: 'Packages',
        icon: 'home-outline',
        link: '/pages/packages/list',
        hidden: !findRole('Packages'),
      },
      {
        title: 'Settings',
        icon: 'layout-outline',
        hidden: !findRole('Settings'),
        children: [
          {
            title: 'City',
            link: '/pages/admin/city',
          },
          {
            title: 'User',
            link: '/pages/admin/user',
          },
          {
            title: 'Role Master',
            link: '/pages/admin/role',
          },
        ],
      },
    ];
    this._menuItems.next(dynamicMenuItems);
  }

  /**
   * Clear the menu when the user logs out.
   */
  clearMenu(): void {
    this._menuItems.next([]); // Set an empty array or default public menu
  }
}