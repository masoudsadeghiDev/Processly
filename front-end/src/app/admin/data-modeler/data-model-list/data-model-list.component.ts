import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbIconLibraries, NbTreeGridDataSource } from "@nebular/theme";
import { ProcessStatus } from "app/shared/model/ProcessStatus";
import { BaseService } from "app/shared/services/base.service";
import { ProcessService } from "app/shared/services/process.service";
import { LocalDataSource } from "ng2-smart-table";

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}
@Component({
  selector: "ngx-data-model-list",
  templateUrl: "./data-model-list.component.html",
  styleUrls: ["./data-model-list.component.scss"],
})
export class DataModelListComponent implements OnInit {
  @Input() kind: string;
  @Input() expanded: boolean;
  allColumns = [];
  tableSource: LocalDataSource;
  settings = {};

  constructor(
    private router: Router,
    private base: BaseService,
    private service: ProcessService,
    iconsLibrary: NbIconLibraries
  ) {
    iconsLibrary.registerFontPack("ion", { iconClassPrefix: "ion" });
  }

  ngOnInit(): void {
    this.initTable()
    this.onGetData();
  }


  onDesign({ action, data }) {
    const { id } = data;
    this.router.navigate(["/admin/data-modeler/designer"], {
      queryParams: data,
    });
  }

  onGetData() {
    const appId = globalThis.app.value;
    this.service.getProcess(appId,ProcessStatus.MODEL_DESIGN);
    this.service
      .process()
      .subscribe((process) => this.tableSource.load(process));
  }

  onCreateApplication(event) {

    

    // const appId = globalThis.app.value;
    // this.base
    //   .post("process/" + appId, { ...newData })
    //   .subscribe(this.onGetData.bind(this));
    // this.tableSource.refresh();
  }

  initTable() {
    this.allColumns = ["id", "name", "displayName", "submitDate"];
    this.tableSource = new LocalDataSource();
    this.settings = {
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
          editable: false,
          addable: false,
        },
      },
    };
  }
}
