import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ApplicationComponent } from "./application.component";
import { ApplicationNotFoundComponent } from "./components/application-not-found/application-not-found.component";
import { ListComponent } from "./components/list/list.component";

const routes: Routes = [
  {
    path: "",
    component: ApplicationComponent,
    children: [
      {
        path: "list",
        component: ListComponent,
      },
      {
        path: "app-not-found",
        component: ApplicationNotFoundComponent,
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
export class ApplicationRoutingModule {}
