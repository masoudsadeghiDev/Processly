import { Injectable } from "@angular/core";
import { BaseService } from "app/shared/services/base.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  private _statastic: BehaviorSubject<any> = new BehaviorSubject(null);

  get statastic() {
    return this._statastic.asObservable();
  }

  constructor(private base: BaseService) {
    this.base
      .get("request/statistics", {
        app: globalThis.app.value,
        all: false,
      })
      .subscribe((stat) => {
        this._statastic.next(stat);
      });
  }
}
