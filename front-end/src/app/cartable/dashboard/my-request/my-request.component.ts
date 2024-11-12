import { Component, OnInit } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { PersianDatePipe } from "app/shared/pipe/persian-date.pipe";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";
import { NewRequestDialogComponent } from "../new-request-dialog/new-request-dialog.component";

@Component({
  selector: "ngx-my-request",
  templateUrl: "./my-request.component.html",
  styleUrls: ["./my-request.component.scss"],
})
export class MyRequestComponent implements OnInit {
  settings = {};
  tableSource: LocalDataSource = new LocalDataSource();

  constructor(private base: BaseService, private pipe: PersianDatePipe,private dialog:NbDialogService) {}

  ngOnInit(): void {
    this.onInitTable();
    this.onGetData();
  }

  onSelectRequest({data}) {

  }

  onCreateRequest(){
    this.dialog.open(NewRequestDialogComponent)
  }

  onGetData() {
    this.base.get("request/my").subscribe((list: any[]) => {
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
