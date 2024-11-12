import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-add-to-wizard-dialog",
  templateUrl: "./add-to-wizard-dialog.component.html",
  styleUrls: ["./add-to-wizard-dialog.component.scss"],
})
export class AddToWizardDialogComponent implements OnInit {
  constructor(protected ref: NbDialogRef<AddToWizardDialogComponent>) {}
  ngOnInit(): void {}

  submit() {
    this.ref.close(true);
  }
  dismiss() {
    this.ref.close(false);
  }
}
