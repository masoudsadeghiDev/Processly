import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { Observable } from "rxjs";
import { StatisticsService } from "./statistics.service";

@Component({
  selector: "ngx-chartjs-pie",
  template: `<chart type="pie" [data]="data" [options]="options"></chart> `,
})
export class ChartjsPieComponent implements OnDestroy, OnInit {
 
  data: any;
  options: any;
  themeSubscription: any;
  colors: any;

  constructor(
    private theme: NbThemeService,
    private service: StatisticsService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };

      this.service.statastic.subscribe((stat) => {
        if (stat) {
          this.data = {
            labels: ["پایان یافته", "در حال اجرا"],
            datasets: [
              {
                data: [ stat.Complete,stat.Running],
                backgroundColor: [
                  this.colors.successLight,
                  this.colors.infoLight,
                ],
              },
            ],
          };
        }
      });
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
