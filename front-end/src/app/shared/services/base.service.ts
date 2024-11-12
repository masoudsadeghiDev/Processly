import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from "@angular/common/http";
import { catchError, last, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ParamsHandler } from "../utility/ParamsHandler";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {
    // userService.initToken()
  }

  public get(url: string, data: any = null): Observable<any> {
    return this.http.get(`${this.generateUrl(url)}?${this.createPrams(data)}`);
  }

  post(url: string, data: any): Observable<any> {
    return this.http
      .post(this.generateUrl(url), data)
      .pipe(catchError(this.handleError.bind(this)));
  }

  put(url: string, data: any): Observable<any> {
    return this.http
      .put(this.generateUrl(url), data)
      .pipe(catchError(this.handleError.bind(this)));
  }

  delete(url: string, data: any): Observable<any> {
    return this.http
      .delete(`${this.generateUrl(url)}?${this.createPrams(data)}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  refreshToken() {
    return this.http
      .post<any>(`${this.BASE_URL}/auth/RefreshToken`, {
        token,
      })
      .toPromise();
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);

    let req = new HttpRequest(
      "POST",
      this.generateUrl("file/upload"),
      formData,
    );

    return this.http.request(req);
  }
  private handleError(error: HttpErrorResponse) {
    const { status } = error;
    if (status == undefined) {
      // this.notificationService.show(
      //   error + "",
      //   NotificationType.ERROR,
      //   "اخطار !"
      // );
    } else {
      switch (status) {
        case 404: {
          // this.notificationService.show(
          //   "not found",
          //   NotificationType.ERROR,
          //   "404"
          // );
          break;
        }
        case 401: {
          // this.notificationService.show(
          //   "unathorize",
          //   NotificationType.ERROR,
          //   "401"
          // );
          break;
        }

        case 403: {
          // this.notificationService.show(
          //   "شما دسترسی لازم جهت استفاده از این سرویس را ندارید",
          //   NotificationType.ERROR,
          //   "403"
          // );
          break;
        }
        case 500: {
          // this.notificationService.show(
          //   "server error",
          //   NotificationType.ERROR,
          //   "500"
          // );
          break;
        }
        default:
        // const errorMessage = (error.error.messages as string[]).toString();
        // this.notificationService.show(
        //   errorMessage,
        //   NotificationType.WARN,
        //   "اخطار"
        // );
      }
    }
  }

  private createPrams(data: any): String {
    let paramHandler = new ParamsHandler();
    for (let key in data) {
      paramHandler.addParam(key, data[key]);
    }
    return paramHandler.getUrlPrp();
  }

  private generateUrl(url: string) {
    return `${this.BASE_URL}/${url}`;
  }
}
