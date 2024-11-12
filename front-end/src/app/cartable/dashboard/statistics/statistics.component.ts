import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "app/shared/services/application.service";
import { BaseService } from "app/shared/services/base.service";
import { stat } from "fs";
import { BehaviorSubject, Observable } from "rxjs";
import { StatisticsService } from "./statistics.service";

@Component({
  selector: "ngx-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent implements OnInit {
  isLoading: boolean;
  constructor(public service: StatisticsService) {
    service.statastic.subscribe((stat) => {
      this.isLoading = stat == null;
    });
  }

  ngOnInit(): void {}
}
