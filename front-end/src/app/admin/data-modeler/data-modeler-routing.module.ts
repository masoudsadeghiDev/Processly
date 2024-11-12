import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataModelListComponent } from "./data-model-list/data-model-list.component";
import { DataModelerComponent } from "./data-modeler.component";
import { DesignerComponent } from "./designer/designer.component";

const routes: Routes = [
  {
    path: "",
    component: DataModelerComponent,
    children: [
      {
        path: "list", 
        component: DataModelListComponent,
      },
      {
        path: "designer",
        component: DesignerComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataModelerRoutingModule {}
