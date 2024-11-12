import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ApplicationService implements OnInit {
  APP_KEY = "current";
  currentApplication: any = null;
  _applications = [];
  applications: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(private base: BaseService,private router:Router) {
    globalThis.app = this.getApplicationFromStorage();
    this.applications = new BehaviorSubject([]);
  }
  ngOnInit(): void {
    
  }

  get applicationsList(): Observable<any[]> {
    return this.applications.asObservable();
  }
  setApplication(app) {
    localStorage.setItem(this.APP_KEY, JSON.stringify(app));
    globalThis.app = JSON.stringify(app[0]);
  }

  setApplicationFromMenu(app) {
    const appValue = { value: app.id, name: app.displayName };
    localStorage.setItem(this.APP_KEY, JSON.stringify(appValue));
    globalThis.app = appValue;
  }

  getApplicationList() {
    this.base.get("application").subscribe((list) => {
      this.applications.next(list);
    });
  }

  getApplicationFromStorage() {
    const json = localStorage.getItem(this.APP_KEY);
    const app = JSON.parse(json);
    globalThis.app = app;
    return app;
  }
  
  navigateToAppNotFound() {
    this.router.navigate(["application/app-not-found"]);
  }
}

declare global {
  var app: any;
}
