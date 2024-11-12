import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbTreeGridDataSource } from "@nebular/theme";
import { ProcessStatus } from "app/shared/model/ProcessStatus";
import { ProcessService } from "app/shared/services/process.service";
import { LocalDataSource } from "ng2-smart-table";

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}
@Component({
  selector: "ngx-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.scss"],
})
export class FormListComponent implements OnInit {
  @Input() kind: string;
  @Input() expanded: boolean;
  allColumns = ["id", "name", "displayName", "submitDate"];
  dataSource: NbTreeGridDataSource<FSEntry>;

  treeSource: LocalDataSource = new LocalDataSource();
  tableSource: LocalDataSource = new LocalDataSource();

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      columnTitle: "عملیات",
      class: "action-column",
      custom: [{ name: "design", title: '<i class="nb-gear"></i>' }],
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

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router, private service: ProcessService) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.onGetData();
  }

  onDesign({ action, data }) {
    const { id } = data;
    this.router.navigate(["/admin/form-modeler/designer"], {
      queryParams: data,
    });
  }

  onGetData() {
    const appId = globalThis.app.value;
    this.service.getProcess(appId,ProcessStatus.FORM_DESIGN);
    this.service
      .process()
      .subscribe((process) => this.tableSource.load(process));
  }
}
