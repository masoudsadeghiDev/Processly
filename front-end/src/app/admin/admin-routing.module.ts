import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "data-modeler",
        loadChildren: () =>
          import("./data-modeler/data-modeler.module").then(
            (m) => m.DataModelerModule
          ),
      },
      {
        path: "form-modeler",
        loadChildren: () =>
          import("./form-modeler/form-modeler.module").then(
            (m) => m.FormModelerModule
          ),
      },
      {
        path: "process-modeler",
        loadChildren: () =>
          import("./process-modeler/process-modeler.module").then(
            (m) => m.ProcessModelerModule
          ),
      },
      {
        path: "business-rule",
        loadChildren: () =>
          import("./business-rule/business-rule.module").then(
            (m) => m.BusinessRuleModule
          ),
      },
      {
        path: "performers",
        loadChildren: () =>
          import("./performers/performers.module").then(
            (m) => m.PerformersModule
          ),
      },
      {
        path: "execution",
        loadChildren: () =>
          import("./execution/execution.module").then((m) => m.ExecutionModule),
      },
      {
        path: "organization",
        loadChildren: () =>
          import("./organization/organization.module").then(
            (m) => m.OrganizationModule
          ),
      },
      {
        path: "user-managment",
        loadChildren: () =>
          import("./user-managment/user-managment.module").then(
            (m) => m.UserManagmentModule
          ),
      },
      {
        path: "statistics",
        loadChildren: () =>
          import("./statistics/statistics.module").then(
            (m) => m.StatisticsModule
          ),
      },
      {
        path: "**",
        redirectTo: "dashboard",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
