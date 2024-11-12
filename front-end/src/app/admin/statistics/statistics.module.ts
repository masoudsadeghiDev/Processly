import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StatisticsRoutingModule } from "./statistics-routing.module";
import { StatisticsComponent } from "./statistics.component";
import { StatisticsService } from "./statistics.service";
import { ChartModule } from "angular2-chartjs";
import { ThemeModule } from "app/@theme/theme.module";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NbCardModule, NbSpinnerModule } from "@nebular/theme";
import { ChartjsPieComponent } from "./chartjs-pie.component";
import { ChartjsBarComponent } from "./chartjs-bar.component";

@NgModule({
  declarations: [
    ChartjsBarComponent,
    ChartjsPieComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ChartModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    NbSpinnerModule,
  ],
  providers: [StatisticsService],
})
export class StatisticsModule {}
