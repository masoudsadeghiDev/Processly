import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GeneralPagesRoutingModule } from "./general-pages-routing.module";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { NbActionsModule, NbButtonModule, NbCardModule, NbLayoutModule } from "@nebular/theme";
import { ThemeModule } from "app/@theme/theme.module";
import { MatCardModule } from "@angular/material/card";
import { DescriptionItemComponent } from "./components/description-item/description-item.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AccessDeniedComponent } from "./components/access-denied/access-denied.component";

@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    DescriptionItemComponent,
    NotFoundComponent,
    AccessDeniedComponent,
  ],
  imports: [
    CommonModule,
    GeneralPagesRoutingModule,
    NbLayoutModule,
    ThemeModule,
    NbActionsModule,
    MatCardModule,
    NbCardModule,
    NbButtonModule
  ],
})
export class GeneralPagesModule {}
