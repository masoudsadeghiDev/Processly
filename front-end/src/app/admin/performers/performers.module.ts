import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PerformersRoutingModule } from "./performers-routing.module";
import { PerformersComponent } from "./performers.component";
import { DesignerComponent } from "./designer/designer.component";
import { PerformersListComponent } from "./performers-list/performers-list.component";
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbStepperModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { TaskPerformersComponent } from './task-performers/task-performers.component';
import { MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ChipListComponent } from "./chip-list/chip-list.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PerformersComponent,
    DesignerComponent,
    PerformersListComponent,
    TaskPerformersComponent,
    ChipListComponent
  ],
  imports: [
    CommonModule,
    PerformersRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule ,
    MatChipsModule ,
    MatAutocompleteModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
    NbIconModule  ,
    NbSelectModule,
    NbStepperModule
    
    
  ],
})
export class PerformersModule {}
