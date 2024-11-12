import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuardService as AuthGuard } from "./shared/services/auth-guard.service";
import { AuthService } from "./shared/services/auth.service";
import { Role } from "./shared/model/Role";

export const routes: Routes = [
  {
    path: "application",
    loadChildren: () =>
      import("./application/application.module").then(
        (m) => m.ApplicationModule
      ),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: Role.ADMIN,
    },
  },
  {
    path: "cartable",
    loadChildren: () =>
      import("./cartable/cartable.module").then((m) => m.CartableModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: [Role.EMPLOYEE, Role.WORKER],
    },
  },
  {
    path: "general",
    loadChildren: () =>
      import("./general-pages/general-pages.module").then(
        (m) => m.GeneralPagesModule
      ),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "**", redirectTo: "general" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService],
})
export class AppRoutingModule {}
