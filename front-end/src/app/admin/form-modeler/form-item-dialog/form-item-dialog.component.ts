import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-form-item-dialog',
  templateUrl: './form-item-dialog.component.html',
  styleUrls: ['./form-item-dialog.component.scss']
})
export class FormItemDialogComponent implements OnInit {

  @Input() test: string;

  constructor(protected ref: NbDialogRef<FormItemDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit(): void {
  }

}
