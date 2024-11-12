import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { ThemeModule } from "app/@theme/theme.module";
import { NbActionsModule, NbMenuModule } from "@nebular/theme";
import { AdminComponent } from "./admin.component";



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
  ],
  providers: [],
})
export class AdminModule {}
