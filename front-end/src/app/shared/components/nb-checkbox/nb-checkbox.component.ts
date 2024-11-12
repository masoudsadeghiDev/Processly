import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-nb-checkbox",
  templateUrl: "./nb-checkbox.component.html",
  styleUrls: ["./nb-checkbox.component.scss"],
})
export class NbCheckboxComponent extends FieldType implements OnInit {
  value = false;
  ngOnInit(): void {
    this.value = this.model[this.key.toString()]
  }
}
