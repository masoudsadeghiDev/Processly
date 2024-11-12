import { Component, OnDestroy } from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { StatisticsService } from "./statistics.service";

@Component({
  selector: "ngx-chartjs-bar",
  template: ` <chart type="bar" [data]="data" [options]="options"></chart> `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private service: StatisticsService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.service.statastic.subscribe((stat) => {
        if (stat) {
          const complete: any[] = JSON.parse(stat.CompleteByProcess);
          const running: any[] = JSON.parse(stat.RunningByProcess);

          const labels = new Set();
          const completeCounts = [];
          const runningCounts = [];
          complete.forEach((item) => {
            labels.add(item.displayName);
            completeCounts.push(item.CompleteCount);
          });
          running.forEach((item) => {
            labels.add(item.displayName);
            runningCounts.push(item.RunningCount)
          });
          
          this.data = {
            labels: [...labels.values()],
            datasets: [
              {
                data: completeCounts,
                label: "پایان یافته",
                backgroundColor: NbColorHelper.hexToRgbA(
                  colors.successLight,
                  0.8
                ),
              },
              {
                data: runningCounts,
                label: "درحال اجرا",
                backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
              },
            ],
          };
        }
      });

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
