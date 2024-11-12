import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
@Component({
  selector: "ngx-form-item-delete-alert",
  templateUrl: "./form-item-delete-alert.component.html",
  styleUrls: ["./form-item-delete-alert.component.scss"],
})
export class FormItemDeleteAlertComponent implements OnInit {
  constructor(protected ref: NbDialogRef<FormItemDeleteAlertComponent>) {}

  ngOnInit(): void {}

  submit() {
    this.ref.close(true);
  }

  dismiss() {
    this.ref.close(false);
  }
}
