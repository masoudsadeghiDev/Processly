import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerComponent } from "./designer/designer.component";
import { FormDesignerComponent } from "./form-designer/form-designer.component";
import { FormListComponent } from "./form-list/form-list.component";
import { FormModelerComponent } from "./form-modeler.component";

const routes: Routes = [
  {
    path: "",
    component: FormModelerComponent,
    children: [
      {
        path: "list",
        component: FormListComponent,
      },
      {
        path: "designer",
        component: DesignerComponent,
      },
      {
        path: "form-designer",
        component: FormDesignerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormModelerRoutingModule {}
