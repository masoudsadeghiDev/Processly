import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataModelerRoutingModule } from "./data-modeler-routing.module";
import { DataModelerComponent } from "./data-modeler.component";
import { DataModelListComponent } from "./data-model-list/data-model-list.component";
import { DesignerComponent } from "./designer/designer.component";

import {
  DiagramModule,
  HierarchicalTreeService,
  DataBindingService,
  RadialTreeService,
  DiagramContextMenuService,
} from "@syncfusion/ej2-angular-diagrams";
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTabsetModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { DataModelDialogComponent } from "./data-model-dialog/data-model-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { AttributeDialogComponent } from './attribute-dialog/attribute-dialog.component';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import {MatMenuModule} from '@angular/material/menu';
import { AttributeValueDialogComponent } from './attribute-value-dialog/attribute-value-dialog.component';



@NgModule({
  declarations: [
    DataModelerComponent,
    DataModelListComponent,
    DesignerComponent,
    DataModelDialogComponent,
    AttributeDialogComponent,
    AttributeValueDialogComponent
  ],
  imports: [
    CommonModule,
    DataModelerRoutingModule,
    DiagramModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    NbIconModule,
    NbTabsetModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    NbAccordionModule,
    NbSelectModule,
    ContextMenuModule,
    MatMenuModule,
    
  ],
  providers: [
    HierarchicalTreeService,
    DataBindingService,
    RadialTreeService,,
    DiagramContextMenuService

  ],
  bootstrap:[DesignerComponent]
})
export class DataModelerModule {}
