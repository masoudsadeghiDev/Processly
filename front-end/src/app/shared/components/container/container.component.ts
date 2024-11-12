import { Component, OnInit } from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "ngx-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent extends FieldWrapper implements OnInit {
  cls = "";

  ngOnInit(): void {
    const { size } = this.to;
    this.cls = `col-lg-${size}`;
  }
}
