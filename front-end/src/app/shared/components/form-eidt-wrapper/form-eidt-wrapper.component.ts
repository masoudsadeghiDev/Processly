import { Component, OnInit } from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "ngx-form-eidt-wrapper",
  templateUrl: "./form-eidt-wrapper.component.html",
  styleUrls: ["./form-eidt-wrapper.component.scss"],
})
export class FormEidtWrapperComponent extends FieldWrapper implements OnInit {
  ngOnInit(): void {}


  onDelete() {
    this.to.onDelete(this.key);
  }

  onFocus() {
    this.to.onFocus(this.key);
  }
}
