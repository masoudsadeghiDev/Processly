import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormModelerRoutingModule } from "./form-modeler-routing.module";
import { FormModelerComponent } from "./form-modeler.component";
import { DesignerComponent } from "./designer/designer.component";
import { FormListComponent } from "./form-list/form-list.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbTabsetModule,
  NbThemeModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { FormItemDialogComponent } from "./form-item-dialog/form-item-dialog.component";
import { MatTreeModule } from "@angular/material/tree";
import { FormDesignerComponent } from "./form-designer/form-designer.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { ThemeModule } from "app/@theme/theme.module";
import { FormItemDeleteAlertComponent } from './form-item-delete-alert/form-item-delete-alert.component';
import { FormNameDialogComponent } from './form-name-dialog/form-name-dialog.component';
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [
    FormModelerComponent,
    DesignerComponent,
    FormListComponent,
    FormItemDialogComponent,
    FormDesignerComponent,
    FormItemDeleteAlertComponent,
    FormNameDialogComponent
  ],
  imports: [
    CommonModule,
    FormModelerRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbThemeModule,
    DragDropModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    NbButtonModule,
    MatTreeModule,
    NbIconModule,
    MatIconModule,
    MatButtonToggleModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbTabsetModule,
    NbCheckboxModule,
    SharedModule
  ],
})
export class FormModelerModule {}
