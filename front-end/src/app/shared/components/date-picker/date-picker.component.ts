import { Component, Input, OnInit } from "@angular/core";
import { MAT_DATE_LOCALE } from "@angular/material/core";

import { Subscription } from "rxjs";
import { FieldType } from "@ngx-formly/core";
import { convertToMilady } from "./convert-to-jalali";

@Component({
  selector: "ngx-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
})
export class DatePickerComponent extends FieldType implements OnInit {
  subscription: Subscription = null;

  minDate = null;
  maxDate = null;
 
  ngOnInit() {
    this.setChangeSubscription();
    if (this.to.maxDate) {
      this.maxDate = this.to.maxDate;
    }
    if (this.to.minDate) {
      this.minDate = this.to.minDate;
    }
  }

  init() {
    const { defaultValue } = this.field;
    const { setDefault } = this.to;
    if (setDefault !== false) {
      if (defaultValue && typeof defaultValue == "string") {
        const convertedValue = convertToMilady(defaultValue);
        this.field.defaultValue = convertedValue;
        this.formControl.setValue(convertedValue);
      } else if (typeof defaultValue == "object") {
        this.formControl.setValue(defaultValue);
      } else {
        // this.field.defaultValue = new Date();
        // this.formControl.setValue(new Date());
      }
    }
    this.to.appearance = "outline";
  }
  resetToDefault() {
    this.formControl.setValue(null);
    this.to.floatLabel = "auto";
  }

  dateChange(event) {
    this.formControl.setValue(new Date(event.value));
  }

  setChangeSubscription() {
    // this.subscription = this.formControl.valueChanges.subscribe(change => {
    //   if (typeof change == "string") {
    //     const convertedValue = convertToMilady(change);
    //     this.formControl.setValue(convertedValue);
    //   }
    // });
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
