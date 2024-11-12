import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-attribute-value-dialog",
  templateUrl: "./attribute-value-dialog.component.html",
  styleUrls: ["./attribute-value-dialog.component.scss"],
})
export class AttributeValueDialogComponent implements OnInit {
  entityId: number;
  allColumns = [];
  tableSource: LocalDataSource;
  settings = {};

  constructor(
    private base: BaseService,
    protected ref: NbDialogRef<AttributeValueDialogComponent>
  ) {}
  ngOnInit(): void {
    this.initTable();
    this.base.get("entity/data/" + this.entityId).subscribe((values) => {
      this.tableSource = new LocalDataSource(values);
    });
  }

  dismiss() {
    this.ref.close(null);
  }

  async submit() {
    const values = await this.tableSource.getAll();
    this.ref.close({ values, entityId: this.entityId });
  }

  async onDeleteConfirm({ data }) {
    let values: any[] = await this.tableSource.getAll();
    values = values.filter((item) => (item.id = data.id));
    this.tableSource = new LocalDataSource(values);
  }
  initTable() {
    this.allColumns = ["id", "value"];
    this.tableSource = new LocalDataSource();
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
      },
      actions: {
        columnTitle: "عملیات",
        class: "action-column",
      },
      columns: {
        id: {
          title: "شناسه",
          type: "number",
          editable: false,
          addable: false,
        },
        value: {
          title: "مقدار",
          type: "string",
        },
      },
    };
  }
}
