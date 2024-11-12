import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import {  DashboardComponent } from "./dashboard.component";
import { ProcessManagerComponent } from "./process-manager/process-manager.component";
import { ControleItem, WizardComponent } from "./wizard/wizard.component";
import { MatCardModule } from "@angular/material/card";
import { WizardService } from "./wizard/wizard.service";
import { WizardDirective } from "./wizard/wizard.directive";
import { NbCardModule, NbSelectModule, NbButtonModule ,NbIconModule,NbActionsModule} from "@nebular/theme";
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    DashboardComponent,
    ProcessManagerComponent,
    WizardComponent,
    WizardDirective,
    ControleItem
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    MatIconModule,
    NbActionsModule
  ],
  providers: [WizardService],
})
export class DashboardModule {}
