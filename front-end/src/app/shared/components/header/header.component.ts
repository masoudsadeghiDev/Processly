import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent extends FieldType implements OnInit {
  value = "";

  ngOnInit(): void {
    const { value } = this.to;
    this.value = value;
  }
}
 