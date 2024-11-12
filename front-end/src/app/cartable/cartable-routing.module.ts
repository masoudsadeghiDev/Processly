import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartableComponent } from "./cartable.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: CartableComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "**",
        redirectTo: "/cartable",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartableRoutingModule {}
