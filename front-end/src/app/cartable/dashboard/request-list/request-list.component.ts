import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersianDatePipe } from "app/shared/pipe/persian-date.pipe";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"],
})
export class RequestListComponent implements OnInit {
  settings = {};
  tableSource: LocalDataSource = new LocalDataSource();

  constructor(
    private base: BaseService,
    private pipe: PersianDatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onInitTable();
    this.onGetData();
  }

  onSelectRequest({ data }) {
    this.router.navigate(["cartable/request-show"], {
      queryParams: {
        activityId: data.activityId,
        processId: data.processId,
        requestId: data.id,
      },
    });
  }

  onGetData() {
    this.base.get("request/received").subscribe((list: any[]) => {
      list = list.map((item) => {
        return {
          ...item,
          date: this.pipe.transform(item.date),
        };
      });
      this.tableSource.load(list);
    });
  }

  onInitTable() {
    this.settings = {
      add: false,
      actions: false,
      columns: {
        id: {
          title: "شناسه",
          type: "number",
          editable: false,
          addable: false,
        },
        senderFullName: {
          title: "فرستنده",
          type: "string",
        },
        displayName: {
          title: "نام فرایند",
          type: "string",
        },
        date: {
          title: "تاریخ درخواست",
          type: "string",
        },
        status: {
          title: "وضعیت فعلی",
          type: "string",
        },
      },
    };
  }
}
