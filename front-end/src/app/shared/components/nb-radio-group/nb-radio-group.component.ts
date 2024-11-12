import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-nb-radio-group",
  templateUrl: "./nb-radio-group.component.html",
  styleUrls: ["./nb-radio-group.component.scss"],
})
export class NbRadioGroupComponent extends FieldType implements OnInit {
  groupOptions: any[];
  value = null;

  ngOnInit(): void {
    const { options, value } = this.to;
    this.groupOptions = options as any[];
    this.value = this.model[this.key.toString()];
  }
}
