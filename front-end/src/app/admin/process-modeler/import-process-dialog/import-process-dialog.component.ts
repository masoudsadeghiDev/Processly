import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { BaseService } from "app/shared/services/base.service";

@Component({
  selector: "ngx-import-process-dialog",
  templateUrl: "./import-process-dialog.component.html",
  styleUrls: ["./import-process-dialog.component.scss"],
})
export class ImportProcessDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
  });
  xml: string = "";
  constructor(
    private base: BaseService,
    protected ref: NbDialogRef<ImportProcessDialogComponent>
  ) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
  submit() {
    const { name } = this.form.value;
    const appId = globalThis.app.value;
    this.base
      .post("process/" + appId, { name })
      .subscribe((response) =>
        this.ref.close({
          processId: response.id,
          processName: name,
          xml: this.xml,
        })
      );
  }

  handleFileInput(files: FileList) {
    files[0].text().then((text) => {
      this.xml = text;
    });
  }
}
