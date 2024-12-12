import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { debounce } from "rxjs/operator/debounce";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  Userid: any;
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.Userid = localStorage.getItem("Userid");
    // this.data.currentEntity.subscribe(msg => this.Entity = msg)
    // this.User = JSON.parse(localStorage.getItem("User"));
    if (this.Userid != null && this.Userid != "" && this.Userid != undefined) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  canActivateChild() {
    return true;
  }
}
