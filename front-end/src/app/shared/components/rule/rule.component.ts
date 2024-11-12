import { Component, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";
import { EventEmitter } from "events";

@Component({
  selector: "ngx-rule",
  templateUrl: "./rule.component.html",
  styleUrls: ["./rule.component.scss"],
})
export class RuleComponent extends FieldType implements OnInit {
  data: any;
  selectOptions: any[] = [
    { title: "برابر", value: "==" },
    { title: "مخالف", value: "!=" },
  ];
  isPrimitive = true;

  itemForm = new FormGroup({
    operation: new FormControl(),
    value: new FormControl(),
  });
  value = "";
  name = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.data = this.to.data;
    this.name = this.data.name;
    switch (this.data.type) {
      case "MANY_TO_ONE":
        this.isPrimitive = false;
        break;
      case "PRIMITIVE":
        if (this.data.primitiveType == "integer") {
          this.selectOptions = [
            ...this.selectOptions,
            { title: "بزرگ تر", value: ">" },
            { title: "کوچک تر", value: "<" },
            { title: " بزرگ تر مساوی", value: ">=" },
            { title: " کوچک تر مساوی", value: "<=" },
          ];
        }
        break;
    }

    this.itemForm.valueChanges.subscribe(({ operation, value }) => {
      if(this.isPrimitive){
        this.value = `${this.name}${operation}${value}`;
      }else{
        this.value = `${this.name}.id${operation}${value}`;
      }
      this.to.getCondition(this.key.toString(), this.value);
    });
  }
}
