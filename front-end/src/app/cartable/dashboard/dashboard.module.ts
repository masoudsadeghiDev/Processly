import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { MyRequestComponent } from "./my-request/my-request.component";
import { RequestListComponent } from "./request-list/request-list.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ThemeModule } from "app/@theme/theme.module";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { NbButtonModule, NbCardModule, NbSpinnerModule } from "@nebular/theme";
import { ChartjsBarComponent } from "./statistics/chartjs-bar.component";
import { ChartjsPieComponent } from "./statistics/chartjs-pie.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NewRequestDialogComponent } from './new-request-dialog/new-request-dialog.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { ShowRequestComponent } from './show-request/show-request.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";

@NgModule({
  declarations: [
    ChartjsBarComponent,
    ChartjsPieComponent,
    DashboardComponent,
    MyRequestComponent,
    RequestListComponent,
    StatisticsComponent,
    NewRequestDialogComponent,
    NewRequestComponent,
    ShowRequestComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    NbSpinnerModule,
  ],
})
export class DashboardModule {}
