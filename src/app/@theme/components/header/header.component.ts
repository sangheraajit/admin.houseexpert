import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MenuService } from '../../../@core/services/menu.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  public headerTitle = environment.projName;

  themes = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
    { value: 'cosmic', name: 'Cosmic' },
    { value: 'corporate', name: 'Corporate' },
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Profile', data: { action: 'profile' } },
    { title: 'Log out', data: { action: 'logout' } },
  ];

  // Assuming your main menu component uses this `menuItems`
  // You'll need to pass this to your <nb-sidebar> component or wherever your main menu is rendered.
  // For example: <nb-sidebar><nb-menu [items]="mainMenuItems"></nb-menu></nb-sidebar>
  mainMenuItems: NbMenuItem[] = []; // <-- Will hold the dynamic menu
  isLoggingOut: boolean = false;
  constructor(
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService, // Renamed from menuService to avoid conflict with `NbMenuService` instance
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private router: Router,
    private appMenuService: MenuService, 
    private toastrService: NbToastrService, 
  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item }) => item),
        takeUntil(this.destroy$),
      )
      .subscribe(item => {
        if (item.data && item.data.action === 'logout') {
          this.performLogout();
        } else if (item.data && item.data.action === 'profile') {
          this.router.navigateByUrl('/pages/profile');
        }
      });

    // --- New: Subscribe to dynamic menu items from MenuService ---
    this.appMenuService.menuItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.mainMenuItems = items;
        // If your main menu is inside a Nebular <nb-sidebar><nb-menu [items]="mainMenuItems"></nb-menu></nb-sidebar>
        // this will automatically update the sidebar menu.
      });

    // Initial load of the menu in case user refreshes
    this.appMenuService.updateMenuBasedOnRoles();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.nbMenuService.navigateHome(); // Using nbMenuService from Nebular
    return false;
  }

  performLogout(): void {
     this.isLoggingOut = true; // Show spinner
    this.toastrService.info('Logging out...', 'Please wait'); // Show a toast message

    console.log('Clearing local storage before Nebular logout...');
    localStorage.clear();
    console.log('Local storage cleared.');

    this.appMenuService.clearMenu();


  

       this.authService.logout('email')
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (result) => {
        if (result.isSuccess()) {
          this.toastrService.success('Logged out successfully!', 'Success'); // <-- Success toast
           this.router.navigateByUrl('login');
        } else {
          this.toastrService.danger('Logout failed!', 'Error'); // <-- Error toast
        }
      },
      error: (error) => {
        this.toastrService.danger('An error occurred during logout.', 'Error'); // <-- Error toast for API issues
      },
      complete: () => {
        this.isLoggingOut = false; // Hide spinner
      }
    });
  }
}