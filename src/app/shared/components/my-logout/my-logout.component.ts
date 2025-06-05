import { Component, OnInit } from '@angular/core';

import { NbLogoutComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router'; // Import Router if you want to redirect

@Component({
  selector: 'ngx-my-logout',
  templateUrl: './my-logout.component.html',
  styleUrls: ['./my-logout.component.scss']
})
export class MyLogoutComponent extends NbLogoutComponent implements OnInit {

  ngOnInit(){
    console.log("Logout Component Initialized");
    localStorage.removeItem('auth_app_token');

    this.router.navigateByUrl('/auth/login');
  }

}
