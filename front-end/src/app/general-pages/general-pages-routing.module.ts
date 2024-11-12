import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { AccessDeniedComponent } from "./components/access-denied/access-denied.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "about",
    component: AboutPageComponent,
  },
  {
    path: "404",
    component: NotFoundComponent,
  },
  {
    path: "403",
    component: AccessDeniedComponent,
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPagesRoutingModule {}
