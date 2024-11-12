import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NbDialogRef, NbSelectComponent } from "@nebular/theme";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-data-model-dialog",
  templateUrl: "./data-model-dialog.component.html",
  styleUrls: ["./data-model-dialog.component.scss"],
})
export class DataModelDialogComponent implements OnInit {
  @ViewChild("item", { static: true }) accordion;

  model = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    entityType: new FormControl(),
  });

  haveMainModel: boolean = false;

  constructor(protected ref: NbDialogRef<DataModelDialogComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close(null);
  }

  async submit() {
    let value = this.model.value;
    if (!this.haveMainModel) {
      value.entityType = "MASTER";
      value.mainModel = true;
    } else {
      value.mainModel = false;
    }
    this.ref.close(value);
  }
}
