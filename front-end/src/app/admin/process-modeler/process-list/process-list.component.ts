import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbDialogService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { SmartTableData } from "app/@core/data/smart-table";
import { ProcessStatus } from "app/shared/model/ProcessStatus";
import { BaseService } from "app/shared/services/base.service";
import { ProcessService } from "app/shared/services/process.service";
import { LocalDataSource } from "ng2-smart-table";
import { AddToWizardDialogComponent } from "../add-to-wizard-dialog/add-to-wizard-dialog.component";

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: "ngx-process-list",
  templateUrl: "./process-list.component.html",
  styleUrls: ["./process-list.component.scss"],
})
export class ProcessListComponent implements OnInit {
  @Input() kind: string;
  @Input() expanded: boolean;
  allColumns = ["id", "name", "displayName", "submitDate"];
  dataSource: NbTreeGridDataSource<FSEntry>;

  treeSource: LocalDataSource = new LocalDataSource();
  tableSource: LocalDataSource = new LocalDataSource();

  settings = {
    actions: {
      custom: [
        {
          name: "design",
          title: '<i class="nb-gear"></i>',
        },
        {
          name: "edit",
          title: '<i class="nb-edit"></i>',
        },
        {
          name: "delete",
          title: '<i class="nb-trash"></i>',
        },
        {
          name: "addToWizard",
          title: '<i class="nb-plus-circled"></i>',
        },
      ],
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
        title: "نام نمایشی",
        type: "string",
      },
      submitDate: {
        title: "تاریخ ثبت",
        type: "string",
        editable: false,
        addable: false,
      },
    },
  };

  constructor(
    private router: Router,
    private base: BaseService,
    private service: ProcessService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

  isDir(): boolean {
    return this.kind === "dir";
  }

  // onGetData() {
  //   this.base.get("application").subscribe((applications: Array<any>) => {
  //     const data = applications.map((app) => {
  //       let process: Array<any> = app.processes as any[];
  //       if (process != null) {
  //         process = process.map((process) => {
  //           return {
  //             data: {
  //               id: process.id,
  //               name: process.name,
  //               displayName: process.displayName,
  //             },
  //           };
  //         });
  //       } else {
  //         process = [];
  //       }
  //       return {
  //         data: { id: app.id, name: app.name, displayName: app.displayName },
  //         children: process,
  //       };
  //     });

  //     this.dataSource = this.dataSourceBuilder.create(data);
  //     this.tableSource.load(applications);
  //   });
  // }

  onCreateProcess({ confirm, newData }) {
    const appId = globalThis.app.value;
    this.base.post("process/" + appId, { ...newData }).subscribe(() => {
      confirm.resolve();
      this.onGetData();
    });
    this.tableSource.refresh();
  }

  onGetData() {
    const appId = globalThis.app.value;
    this.service.getProcess(appId,ProcessStatus.PROCESS_DESIGN);
    this.service.process().subscribe((process) => {
      this.tableSource.load(process);
    });
  }

  onDesign({ action, data }) {
    if (action == "design") {
      this.router.navigate(["/admin/process-modeler/designer"], {
        queryParams: data,
      });
    } else if (action == "delete") {
    } else if (action == "edit") {
    } else if (action == "addToWizard") {
      this.dialogService
        .open(AddToWizardDialogComponent, {})
        .onClose.subscribe((result) => {
          if(result){
            this.base.get(`process/addToWizard/${data.id}`).subscribe(()=>{
              this.router.navigate(['admin/dashboard/wizard'])
            })
          }
        });
    }
  }
}
