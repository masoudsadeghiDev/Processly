import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProcessModelerRoutingModule } from "./process-modeler-routing.module";
import { ProcessModelerComponent } from "./process-modeler.component";
import { DesignerComponent } from "./designer/designer.component";
import { ProcessListComponent } from "./process-list/process-list.component";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSidebarModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbInputModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "app/@theme/theme.module";
import { ImportProcessDialogComponent } from "./import-process-dialog/import-process-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { AddToWizardDialogComponent } from './add-to-wizard-dialog/add-to-wizard-dialog.component';

@NgModule({
  declarations: [
    ProcessModelerComponent,
    DesignerComponent,
    ProcessListComponent,
    ImportProcessDialogComponent,
    AddToWizardDialogComponent,
  ],
  imports: [
    CommonModule,
    ProcessModelerRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    NbIconModule,
    NbTabsetModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class ProcessModelerModule {}
