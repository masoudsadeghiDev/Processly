import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-form-name-dialog",
  templateUrl: "./form-name-dialog.component.html",
  styleUrls: ["./form-name-dialog.component.scss"],
})
export class FormNameDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
  });
  constructor(protected ref: NbDialogRef<FormNameDialogComponent>) {}

  ngOnInit(): void {}
   submit() {
    this.ref.close(this.form.value.name);
  }

  dismiss() {
    this.ref.close(null);
  }
}
