import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.scss"],
})
export class ErrorDialogComponent implements OnInit {
  @Input() title: string;
  @Input() discription: string;

  constructor(protected ref: NbDialogRef<ErrorDialogComponent>) {}
  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
