import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { AuthService } from "app/shared/services/auth.service";
import { ApplicationService } from "app/shared/services/application.service";
import { ProcessService } from "app/shared/services/process.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  app: any;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  applications = [];

  userMenu = [
    { title: "پروفایل", id: "profile" },
    { title: "خروج", id: "logout" },
  ];

  constructor(
    private processService: ProcessService,
    private appService: ApplicationService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.app = this.appService.getApplicationFromStorage();
    this.appService.getApplicationList();
    this.appService.applicationsList.subscribe((applications: Array<any>) => {
      this.applications = applications.map((app) => {
        return {
          value: app.id,
          name: app.displayName,
        };
      });
    });

    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => (this.user = user));

    this.initMenu();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeApp(id) {
    const app = this.applications.filter((a) => a.value == id);

    if (app.length != 0) {
      this.appService.setApplication(app[0]);
      this.processService.clearCurrent();
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  goToWizard(){

    // this.router.navigate(['admin/dashboard/wizard'])
    this.authService.goHome()
  }

  initMenu() {
    this.menuService.onItemClick().subscribe(({ item }) => {
      const id = (item as any).id;
      if (id == "logout") {
        this.authService.logout();
      }
    });
  }
}
