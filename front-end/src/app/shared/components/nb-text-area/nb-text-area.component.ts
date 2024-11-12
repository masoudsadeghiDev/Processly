import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-nb-text-area",
  templateUrl: "./nb-text-area.component.html",
  styleUrls: ["./nb-text-area.component.scss"],
})
export class NbTextAreaComponent extends FieldType implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
