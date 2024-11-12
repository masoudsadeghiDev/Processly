import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrganizationRoutingModule } from "./organization-routing.module";
import { OrganizationComponent } from "./organization.component";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { NbButtonModule, NbCardModule, NbListModule, NbTabsetModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { OrganizationDetaileComponent } from "./organization-detaile/organization-detaile.component";
import { OrganizationChartComponent } from './organization-chart/organization-chart.component';
import {
  DiagramModule,
  HierarchicalTreeService,
  DataBindingService,
  RadialTreeService,
  DiagramContextMenuService,
} from "@syncfusion/ej2-angular-diagrams";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationDetaileComponent,
    OrganizationChartComponent,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbButtonModule,
    DiagramModule,
    NbListModule,
    DragDropModule
  ],
  providers:[HierarchicalTreeService, DataBindingService]
})
export class OrganizationModule {}
