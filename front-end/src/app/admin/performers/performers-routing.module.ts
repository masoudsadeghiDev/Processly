import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerComponent } from "./designer/designer.component";
import { PerformersListComponent } from "./performers-list/performers-list.component";
import { PerformersComponent } from "./performers.component";
import { TaskPerformersComponent } from "./task-performers/task-performers.component";

const routes: Routes = [
  {
    path: "",
    component: PerformersComponent,
    children: [
      {
        path: "designer",
        component: DesignerComponent,
      },
      {
        path: "list",
        component: PerformersListComponent,
      },
      {
        path: "task-performers",
        component: TaskPerformersComponent,
      },
      {
        path: "**",
        redirectTo: "wizard",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformersRoutingModule {}
