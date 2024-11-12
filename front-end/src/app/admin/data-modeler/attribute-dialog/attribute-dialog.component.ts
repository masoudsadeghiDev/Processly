import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-attribute-dialog",
  templateUrl: "./attribute-dialog.component.html",
  styleUrls: ["./attribute-dialog.component.scss"],
})
export class AttributeDialogComponent implements OnInit {
  tableSource: LocalDataSource;
  settings = {};
  allColumns = [];
  classNames = [];
  entityId: number = 0;
  form = new FormGroup({
    name: new FormControl(),
    displayName: new FormControl(),
    primitiveType: new FormControl(),
    type: new FormControl("PRIMITIVE"),
    description: new FormControl(),
    length: new FormControl(),
    defaultValue: new FormControl(),
    className: new FormControl(),
  });
  invalidName = false;

  constructor(
    private base: BaseService,
    protected ref: NbDialogRef<AttributeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initTable();

    this.base
      .get(`entity/attribute/${this.entityId}`)
      .subscribe((attributes) => {
        this.tableSource.load(attributes);
        this.initForm();
      });
  }

  dismiss() {
    this.ref.close();
  }

  async submit() {
    this.ref.close();
  }
  add() {
    const value = this.form.value;
    this.base
      .post(`entity/attribute/${this.entityId}`, value)
      .subscribe(() => this.tableSource.append(value));
    this.form.reset();
    this.initForm();
  }

  async initForm() {
    this.form.value.type = "PRIMITIVE";
    const entities: any[] = await this.tableSource.getAll();
    const existRelation = entities
      .map((en) => en.className)
      .filter((en) => en != null);

    this.classNames = this.classNames.filter(
      (cls) => !existRelation.includes(cls)
    );
  }

  initTable() {
    this.allColumns = ["id", "name", "displayName", "submitDate"];
    this.tableSource = new LocalDataSource([]);
    this.settings = {
      actions: {
        delete: false,
        edit: false,
        add: false,
      },
      pager: {
        display: true,
        perPage: 3,
      },
      columns: {
        name: {
          title: "نام",
          type: "string",
          filter: false,
        },
        type: {
          title: "نوع ارتباط",
          type: "string",
          filter: false,
        },
        primitiveType: {
          title: "نوع داده",
          type: "string",
          filter: false,
        },
        displayName: {
          title: "نام نمایشی ",
          type: "string",
          filter: false,
        },
        length: {
          title: "length",
          type: "string",
          filter: false,
        },
        defaultValue: {
          title: "مقدار پیش فرض",
          type: "string",
          filter: false,
        },
      },
    };
  }

  changeName(event) {
    const name = this.form.value.name;
    this.form.patchValue({ displayName: name });
    
    if (name == "request") {
      this.invalidName = true;
    } else {
      this.invalidName = false;
    }
  }
}
