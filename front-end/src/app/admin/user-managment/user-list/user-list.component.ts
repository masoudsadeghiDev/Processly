import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";
import { UserInfoDialogComponent } from "../user-info-dialog/user-info-dialog.component";

@Component({
  selector: "ngx-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  tableSource: LocalDataSource = new LocalDataSource();
  settings = {};
  constructor(
    private dialogService: NbDialogService,
    private base: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onInitTable();
    this.onGetData();
  }

  onGetData() {
    this.base.get("user/list").subscribe((list) => {
      this.tableSource.load(list);
    });
  }

  createUser() {
    this.router.navigate(["/admin/user-managment/register"]);
  }

  onSelectUser({ data }) {
    this.dialogService
      .open(UserInfoDialogComponent, {
        context: { userId: data.id },
      })
      .onClose.subscribe((status) => {
        this.base
          .get(`user/changeenable/${status}/${data.id}`)
          .subscribe(this.onGetData.bind(this));
      });
  }

  onInitTable() {
    this.settings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },

      columns: {
        username: {
          title: "نام کاربری",
          type: "string",
        },
        name: {
          title: "نام ",
          type: "string",
        },
        family: {
          title: "نام خانوادگی",
          type: "string",
        },
        role: {
          title: "نوع کاربری",
          type: "string",
        },
        email: {
          title: "ایمیل",
          type: "string",
        },
        enable: {
          title: "فعال",
          type: "string",
        },
      },
    };
  }
}
