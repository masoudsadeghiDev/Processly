import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: "ngx-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent extends FieldType implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
