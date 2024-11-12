import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrganizationChartComponent } from "./organization-chart/organization-chart.component";
import { OrganizationDetaileComponent } from "./organization-detaile/organization-detaile.component";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { OrganizationComponent } from "./organization.component";

const routes: Routes = [
  {
    path: "",
    component: OrganizationComponent,
    children: [
      {
        path: "list",
        component: OrganizationListComponent,
      },
      {
        path: "detaile",
        component: OrganizationDetaileComponent,
      },
      {
        path: "chart",
        component: OrganizationChartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
