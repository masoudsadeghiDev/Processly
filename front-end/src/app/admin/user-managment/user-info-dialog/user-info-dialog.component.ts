import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NbDialogRef } from "@nebular/theme";
import { BaseService } from "app/shared/services/base.service";
import { environment } from "environments/environment";

@Component({
  selector: "ngx-user-info-dialog",
  templateUrl: "./user-info-dialog.component.html",
  styleUrls: ["./user-info-dialog.component.scss"],
})
export class UserInfoDialogComponent implements OnInit {
  userId: number;
  info: any;
  enable = 1;

  constructor(
    private base: BaseService,
    protected ref: NbDialogRef<UserInfoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.base.get(`user/info/${this.userId}`).subscribe((info: any) => {
      this.info = info;
      this.info.profile = `${environment.BASE_URL}${info.profile}`;
      if (!this.info.enable) {
        this.enable = 0;
      }
    });
  }

  dismiss() {
    this.ref.close(this.enable);
  }
}
