import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ApplicationRoutingModule } from "./application-routing.module";
import { ApplicationComponent } from "./application.component";
import {
  ApplicationItemComponent,
  ListComponent,
} from "./components/list/list.component";
import { ThemeModule } from "app/@theme/theme.module";

import { SwiperModule } from "ngx-swiper-wrapper";
import { SWIPER_CONFIG } from "ngx-swiper-wrapper";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule } from "@nebular/theme";
import { CreateApplicationDialogComponent } from './components/create-application-dialog/create-application-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ApplicationNotFoundComponent } from "./components/application-not-found/application-not-found.component";
import { ImageCropperModule } from "ngx-image-cropper";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};

@NgModule({
  declarations: [
    ApplicationComponent,
    ListComponent,
    ApplicationItemComponent,
    CreateApplicationDialogComponent,
    ApplicationNotFoundComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ThemeModule,
    SwiperModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    ImageCropperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class ApplicationModule {}
