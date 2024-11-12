import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "ngx-nb-select",
  templateUrl: "./nb-select.component.html",
  styleUrls: ["./nb-select.component.scss"],
})
export class NbSelectComponent extends FieldType implements OnInit {
  selected = null;
  selectOptions: any[];
  ngOnInit(): void {
    const { options, setIdModel } = this.to;
    this.selectOptions = options as any[];
    // const selected = this.model[this.key.toString()];
    // if (selected) {
    //   this.selected = selected;
    // } else {
    //   if ((options as any[]).length > 0) {
    //     this.selected = (options as any[])[0].value;
    //   }
    // }

      this.formControl.valueChanges.subscribe((value) => {
        
        if(Number.isInteger(value)){
          this.model[`${this.key}`] = { id:value };
          this.selected = {id:value}
        }else{
          this.selected = {id : value.id}
        }
      });
    
  }
}
