import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NbDialogService,
  NbTabsetComponent,
  NbTreeGridDataSource,
} from "@nebular/theme";
import { ProcessStatus } from "app/shared/model/ProcessStatus";
import { BaseService } from "app/shared/services/base.service";
import { ProcessService } from "app/shared/services/process.service";
import { LocalDataSource } from "ng2-smart-table";
import { ExecuteDialogComponent } from "../execute-dialog/execute-dialog.component";

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}
@Component({
  selector: "ngx-execution-process-list",
  templateUrl: "./execution-process-list.component.html",
  styleUrls: ["./execution-process-list.component.scss"],
})
export class ExecutionProcessListComponent implements OnInit {
  @ViewChild("tabset") tabsetEl: NbTabsetComponent;
  @ViewChild("running") running;
  @ViewChild("stop") stop;
  allColumns = ["id", "name", "displayName", "submitDate"];
  dataSource: NbTreeGridDataSource<FSEntry>;

  executionTableSource: LocalDataSource = new LocalDataSource();
  stopTableSource: LocalDataSource = new LocalDataSource();

  executionSettings = {};
  stopSettings = {};
  tabIndex = 0;

  constructor(
    private dialogService: NbDialogService,
    private base: BaseService,
    private processService: ProcessService
  ) {}

  ngOnInit(): void {
    this.initTables();
    this.onGetData();
  }

  onExecute({ data }) {
    const { id } = data;
    this.dialogService
      .open(ExecuteDialogComponent, {
        context: { processStatus: ProcessStatus.RUNNING },
      })
      .onClose.subscribe((status) => {
        if (status) {
          this.changeProcessStatus(id, status).subscribe(() => {
            this.clearTables();
            this.tabsetEl.selectTab(this.running);
          });
        }
      });
  }

  onStop({ data }) {
    const { id } = data;
    this.dialogService
      .open(ExecuteDialogComponent, {
        context: { processStatus: ProcessStatus.STOP },
      })
      .onClose.subscribe((status) => {
        if (status) {
          this.changeProcessStatus(id, status).subscribe(() => {
            this.clearTables();
            this.tabsetEl.selectTab(this.stop);
          });
        }
      });
  }

  changeProcessStatus(id, status) {
    return this.base.put("process/changeStatus", { processId: id, status });
  }

  onGetData() {
    this.tabIndex = this.tabIndex == 0 ? 1 : 0;

    const status =
      this.tabIndex == 0 ? ProcessStatus.RUNNING : ProcessStatus.STOP;
    const appId = globalThis.app.value;
    this.processService.getProcess(appId, null, status);

    this.processService.process().subscribe((process) => {
      if (this.tabIndex == 0) {
        this.executionTableSource.load(process);
      } else {
        this.stopTableSource.load(process);
      }
    });
  }

  clearTables() {
    this.stopTableSource.reset();
    this.executionTableSource.reset();
  }

  initTables() {
    this.executionSettings = {
      actions: {
        add: false,
        delete: false,
        edit: false,
        columnTitle: "عملیات",
        class: "action-column",
        custom: [{ name: "design", title: '<i class="nb-pause"></i>' }],
      },
      columns: {
        id: {
          title: "شناسه",
          type: "number",
          editable: false,
          addable: false,
        },
        name: {
          title: "نام فرایند",
          type: "string",
        },
        displayName: {
          title: "نام نمایشی فرایند",
          type: "string",
        },
        submitDate: {
          title: "تاریخ ثبت",
          type: "string",
        },
      },
    };

    this.stopSettings = {
      actions: {
        add: false,
        delete: false,
        edit: false,
        columnTitle: "عملیات",
        class: "action-column",
        custom: [{ name: "design", title: '<i class="nb-play"></i>' }],
      },
      columns: {
        id: {
          title: "شناسه",
          type: "number",
          editable: false,
          addable: false,
        },
        name: {
          title: "نام فرایند",
          type: "string",
        },
        displayName: {
          title: "نام نمایشی فرایند",
          type: "string",
        },
        submitDate: {
          title: "تاریخ ثبت",
          type: "string",
        },
      },
    };
  }
}
