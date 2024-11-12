import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { BehaviorSubject, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "ngx-chip-list",
  templateUrl: "./chip-list.component.html",
  styleUrls: ["./chip-list.component.scss"],
})
export class ChipListComponent implements OnInit {
  @Input() title = "";
  @Input()
  data = [];

  selectedData = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formControl = new FormControl();
  $filteredData: Observable<any[]>;

  @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit(): void {
    this.fruitInput;
  }

  remove(removerdItem): void {
    this.selectedData = this.selectedData.filter(
      (item) => item.id != removerdItem.id
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    const map = new Map();
    this.selectedData.forEach((item) => {
      map.set(item.id, item);
    });
    map.set(value.id, value);

    this.selectedData = [...map.values()];
    this.fruitInput.nativeElement.value = "";
    this.formControl.setValue(null);
  }

  private _filter(value: any | string): any[] {
    let filterValue = "";
    if (typeof value == "string") {
      filterValue = value;
    } else {
      filterValue = value.name;
    }
    filterValue = filterValue.toLowerCase();

    return this.data.filter((item) =>
      item.name.toLowerCase().includes(filterValue)
    );
  }

  onFocus() {
    this.$filteredData = this.formControl.valueChanges.pipe(
      startWith(null),
      map((item) => (item ? this._filter(item) : this.data.slice()))
    );
  }
}
