import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogRef } from "@nebular/theme";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-new-request-dialog",
  templateUrl: "./new-request-dialog.component.html",
  styleUrls: ["./new-request-dialog.component.scss"],
})
export class NewRequestDialogComponent implements OnInit {
  tableSource: LocalDataSource = new LocalDataSource();
  settings = {};

  constructor(
    private router: Router,
    private base: BaseService,
    protected ref: NbDialogRef<NewRequestDialogComponent>
  ) {}

  ngOnInit(): void {
    this.onInitTable();
    this.onGetData();
  }

  onSelectTask({ data }) {
    this.router.navigate(["cartable/request-new"], {
      queryParams: {
        activityId: data.ID,
        processId: data.process_id,
        entityId: data.entityId,
      },
    });
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

  onGetData() {
    this.base.get("task/canCreate").subscribe((tasks: any[]) => {
      tasks = tasks.map((task, index) => {
        return {
          ...task,
          index: index + 1,
        };
      });
      this.tableSource.load(tasks);
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
        index: {
          title: "ردیف",
          type: "string",
        },
        name: {
          title: "نام ",
          type: "string",
        },
        processName: {
          title: "فرایند",
          type: "string",
        },
      },
    };
  }
}
