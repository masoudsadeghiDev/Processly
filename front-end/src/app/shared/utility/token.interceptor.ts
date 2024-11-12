import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { from, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }
  private async handle(httpRequest: HttpRequest<any>, next: HttpHandler) {
    // if (
    //   !httpRequest.url.includes("RefreshToken") &&
    //   !this.authService.isAuthenticated()
    // ) {
    //   try {
    //     const result = await this.authService.refreshToken();
    //   } catch (e) {
    //     this.authService.logout(); // invalid token
    //     return;
    //   }
    // }

    if (httpRequest.url.includes("auth")) {
      return next.handle(httpRequest).toPromise();
    } else {
      return next
        .handle(
          httpRequest.clone({
            setHeaders: this.authService.createTokenHeader(),
          })
        )
        .toPromise();
    }
  }
}
