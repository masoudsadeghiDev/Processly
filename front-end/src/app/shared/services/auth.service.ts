import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import decode from "jwt-decode";
import { of as observableOf, Observable } from "rxjs";
import { Role } from "../model/Role";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  TOKEN_KEY = "token";
  BASE_URL = environment.BASE_URL;

  constructor(private base: BaseService, public router: Router) {
    globalThis.token = localStorage.getItem(this.TOKEN_KEY);
    globalThis.tokenClaims = this.getTokenPayload();
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    globalThis.token = token;
    globalThis.tokenClaims = this.getTokenPayload();
  }
  public isAuthenticated(): boolean {
    const token = globalThis.token;
    try {
      if (!token) return false;
      // return !this.isTokenExpired(token);

      return true;
    } catch (e) {
      return false;
    }
  }
  isTokenExpired() {
    const exp = globalThis.tokenClaims["exp"];
    if (exp) {
      const expDate = new Date(exp * 1000);
      return expDate.getTime() <= Date.now();
    } else {
      return false;
    }
  }

  public getTokenPayload() {
    try {
      const token = globalThis.token;
      return decode(token);
    } catch (e) {
      return null;
    }
  }

  getUser(): Observable<any> {
    const user = {
      name: "",
      picture: "",
    };
    if (globalThis.tokenClaims) {
      const { name, family, profile } = globalThis.tokenClaims;
      user.name = `${name} ${family}`;
      user.picture = this.BASE_URL + profile;
    }
    return observableOf(user);
  }

  login(username: string, password: string) {
    const obs = this.base.post("auth/login", { username, password });
    obs.subscribe(
      ({ token }) => {
        this.setToken(token);
        this.router.navigate(["/application"]);
      },
      (err) => {
      }
    );
  }

  goHome() {
    const role: Role = globalThis.tokenClaims.role;
    switch (role) {
      case Role.ADMIN:
        this.router.navigate(["/admin"]);
        break;
      case Role.BUSINESS_ADMIN:
        this.router.navigate(["/admin"]);
        break;
      case Role.EMPLOYEE:
        this.router.navigate(["/cartable"]);
        break;
      case Role.WORKER:
        this.router.navigate(["/cartable"]);
        break;
    }
  }
  signup() {}

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    globalThis.token = null;
    globalThis.tokenClaims = null;
    this.navigateToAuth();
  }

  navigateToAuth() {
    this.router.navigate(["/auth/login"]);
  }

  navigateToPermissonDenide() {
    this.router.navigate(["general/403"]);
  }

  createTokenHeader() {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": `application/json`,
    };
    return headers;
  }

  refreshToken() {
    return this.base
      .post("auth/RefreshToken", {
        token,
      })
      .toPromise();
  }
}

declare global {
  var token: string;
  var tokenClaims: any;
}
