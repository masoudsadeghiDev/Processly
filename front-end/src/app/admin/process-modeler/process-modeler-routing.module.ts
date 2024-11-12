import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerComponent } from "./designer/designer.component";
import { ProcessListComponent } from "./process-list/process-list.component";
import { ProcessModelerComponent } from "./process-modeler.component";

const routes: Routes = [
  {
    path: "",
    component: ProcessModelerComponent,
    children: [
      {
        path: "list",
        component: ProcessListComponent,
      },
      {
        path: "designer",
        component: DesignerComponent,
      },
      {
        path: "**",
        component: ProcessListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessModelerRoutingModule {}
