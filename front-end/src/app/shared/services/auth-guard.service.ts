import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    try {
      if (!this.auth.isAuthenticated()) {
        this.auth.navigateToAuth();
        return false;
      }
      const { expectedRole } = route.data;
      const expectedRoles = Array.isArray(expectedRole)
        ? expectedRole
        : [expectedRole];

      if (expectedRoles.length == 0) return true;

      const tokenPayload: any = this.auth.getTokenPayload();
      if (!tokenPayload) return false;

      if (!expectedRoles.includes(tokenPayload.role)) {
        this.auth.navigateToPermissonDenide();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
