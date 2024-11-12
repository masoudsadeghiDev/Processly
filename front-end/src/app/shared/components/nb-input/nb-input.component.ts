import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-nb-input",
  templateUrl: "./nb-input.component.html",
  styleUrls: ["./nb-input.component.scss"],
})
export class NbInputComponent extends FieldType implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    const { type } = this.to;
    if (!type) {
      this.to.type = "input";
    }
    this.formControl.valueChanges.subscribe((text) => {
      if(type=="number"){
        this.model[`${this.key}`] = parseInt(text)
      }
    });
  }
}
