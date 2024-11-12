import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { MyRequestComponent } from "./my-request/my-request.component";
import { NewRequestComponent } from "./new-request/new-request.component";
import { RequestListComponent } from "./request-list/request-list.component";
import { ShowRequestComponent } from "./show-request/show-request.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: StatisticsComponent,
      },
      {
        path: "my-request",
        component: MyRequestComponent,
      },
      {
        path: "request-list",
        component: RequestListComponent,
      },
      {
        path: "request-show",
        component: ShowRequestComponent,
      },
      {
        path: "request-new",
        component: NewRequestComponent,
      },
      {
        path: "**",
        redirectTo: "",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
