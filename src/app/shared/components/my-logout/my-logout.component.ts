import { Component, OnInit } from '@angular/core';

import { NbLogoutComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router'; // Import Router if you want to redirect
import { Subject } from 'rxjs';
import { NbSpinnerService, NbToastrService } from '@nebular/theme';
import { MenuService } from '../../../@core/services/menu.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-my-logout',
  templateUrl: './my-logout.component.html',
  styleUrls: ['./my-logout.component.scss']
})
export class MyLogoutComponent extends NbLogoutComponent implements OnInit {

   private destroy$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    protected router: Router,
    private toastrService: NbToastrService,
    private spinnerService: NbSpinnerService, // Global spinner service, though less critical here if component has its own spinner
    private menuService: MenuService, // Custom menu service
  ) {
   
    super(authService,{}, router); // Call the parent constructor with redirectDelay (e.g., 0)
  }

  ngOnInit(): void {
    // Show global spinner if not already showing (optional, as this component has its own)
    this.spinnerService.load();
    this.toastrService.info('Initiating logout sequence...', 'Logging Out', { preventDuplicates: true });

    console.log('Clearing local storage...');
    localStorage.clear(); // Clear local storage first
    console.log('Local storage cleared.');

    this.menuService.clearMenu(); // Clear application menu

    // Perform Nebular's authentication logout
    this.authService.logout('email') // Replace 'email' with your authentication strategy name
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.isSuccess()) {
            console.log('Nebular authentication logout successful!');
            this.toastrService.success('You have been successfully logged out.', 'Success');
            // Nebular's logout usually handles redirection to the login page.
            // If it doesn't, or you need a custom one:
            this.router.navigateByUrl('login'); // Redirect to your main login page
          } else {
            console.error('Nebular authentication logout failed:', result.getResponse());
            this.toastrService.danger('Logout failed. Please try again.', 'Error');
            this.router.navigateByUrl('/login'); // Redirect to login even on failure to avoid stuck state
          }
        },
        error: (error) => {
          console.error('Logout API error:', error);
          this.toastrService.danger('An error occurred during logout. Please try again.', 'Error');
          this.router.navigateByUrl('/login'); // Redirect to login on error
        },
        complete: () => {
         this.spinnerService.clear(); // Hide global spinner once everything is done
          // If you were using a local spinner in this component, you'd hide it here too.
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
