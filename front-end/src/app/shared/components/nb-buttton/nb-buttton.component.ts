import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-nb-buttton",
  templateUrl: "./nb-buttton.component.html",
  styleUrls: ["./nb-buttton.component.scss"],
})
export class NbButttonComponent extends FieldType implements OnInit {
  default = {
    status: "success",
    outline: false,
    hero: true,
    ghost: false,
    disabled: false,
    shape: "rectangle",
    size: "medium",
  };
  ngOnInit(): void {
    this.default = { ...this.default, ...this.to };

  }
}
