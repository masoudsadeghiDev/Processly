import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutionRoutingModule } from './execution-routing.module';
import { ExecutionComponent } from './execution.component';
import { ExecutionProcessListComponent } from './execution-process-list/execution-process-list.component';
import { NbButtonModule, NbCardModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ExecuteDialogComponent } from './execute-dialog/execute-dialog.component';


@NgModule({
  declarations: [ExecutionComponent, ExecutionProcessListComponent, ExecuteDialogComponent],
  imports: [
    CommonModule,
    ExecutionRoutingModule,
    NbTabsetModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule
  ]
})
export class ExecutionModule { }
