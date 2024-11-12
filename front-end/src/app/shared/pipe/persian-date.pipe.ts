import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "jalali-moment";

@Pipe({
  name: "persianDate",
})
export class PersianDatePipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]) {
    return moment(new Date(value)).locale("fa").format("YYYY/MM/DD");
  }
}
