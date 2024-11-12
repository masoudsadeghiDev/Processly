import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ProcessStatus } from "app/shared/model/ProcessStatus";

@Component({
  selector: "ngx-execute-dialog",
  templateUrl: "./execute-dialog.component.html",
  styleUrls: ["./execute-dialog.component.scss"],
})
export class ExecuteDialogComponent implements OnInit {
  processStatus: ProcessStatus;
  constructor(protected ref: NbDialogRef<ExecuteDialogComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close(null);
  }
  submit() {
    this.ref.close(this.processStatus);
  }

  getTitle() {
    if (this.processStatus == ProcessStatus.RUNNING) {
      return " آیا می خواهید فرایند وارد مرحله اجرا شود ؟";
    } else if (this.processStatus == ProcessStatus.STOP) {
      return "آیا می خواهید فرایند متوقف شود ؟";
    }
  }
}
