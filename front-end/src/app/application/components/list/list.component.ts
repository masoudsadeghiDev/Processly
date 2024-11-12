import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Role } from "app/shared/model/Role";
import { ApplicationService } from "app/shared/services/application.service";
import { AuthService } from "app/shared/services/auth.service";
import { ProcessService } from "app/shared/services/process.service";
import { environment } from "environments/environment";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { CreateApplicationDialogComponent } from "../create-application-dialog/create-application-dialog.component";

@Component({
  selector: "ngx-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  menu = [];
  public config: SwiperConfigInterface = {
    direction: "horizontal",
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: true,
  };

  slides = [];
  constructor(
    private applicationSerice: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const payload = this.authService.getTokenPayload();

    this.applicationSerice.getApplicationList();
    this.applicationSerice.applicationsList.subscribe((list: any[]) => {
      if (payload["role"] != "WORKER") {
        list = [{ add: true }, ...list];
      }

      if (list.length == 0) {
        this.applicationSerice.navigateToAppNotFound();
      }

      this.slides = list.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 6);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    });
  }

  onIndexChange(ev) {}
}

@Component({
  selector: "ngx-app",
  template: `
    <div *ngIf="!app.add; else addItem" (click)="onClick(app)">
      <img class="avatar" [src]="toUrl(app)" />
      <div class="title">{{ app.displayName }}</div>
    </div>
    <ng-template #addItem>
      <button class="avatar" color="primary" mat-fab (click)="onAdd()">
        <mat-icon>add</mat-icon>
      </button>
    </ng-template>
  `,
  styleUrls: ["./list.component.scss"],
})
export class ApplicationItemComponent implements OnInit {
  @Input() app: any;
  ngOnInit(): void {}

  constructor(
    private processService: ProcessService,
    private appService: ApplicationService,
    private router: Router,
    private authService: AuthService,
    private dialogService: NbDialogService
  ) {}

  toUrl(app) {
    return `${environment.BASE_URL}${app.image}`;
  }

  onAdd() {
    this.dialogService.open(CreateApplicationDialogComponent, {});
  }
  onClick(app) {
    this.appService.setApplicationFromMenu(app);
    this.processService.clearCurrent();
    this.authService.goHome();
  }
}
