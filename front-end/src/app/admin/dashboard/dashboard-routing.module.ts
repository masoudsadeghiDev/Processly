import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProcessManagerComponent } from "./process-manager/process-manager.component";
import { WizardComponent } from "./wizard/wizard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "wizard",
        component: WizardComponent,
      },
      {
        path:"**",
        redirectTo:"wizard"
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
