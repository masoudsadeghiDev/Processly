import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExecutionProcessListComponent } from "./execution-process-list/execution-process-list.component";
import { ExecutionComponent } from "./execution.component";

const routes: Routes = [
  {
    path: "",
    component: ExecutionComponent,
    children: [
      {
        path: "list",
        component: ExecutionProcessListComponent,
      },
      {
        path: "**",
        redirectTo: "list",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutionRoutingModule {}
