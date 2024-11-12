import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BusinessRuleRoutingModule } from "./business-rule-routing.module";
import { DesignerComponent } from "./designer/designer.component";
import { BusinessRuleListComponent } from "./business-rule-list/business-rule-list.component";
import { BusinessRuleComponent } from "./business-rule.component";
import { ActivityRuleDesignerComponent } from "./activity-rule-designer/activity-rule-designer.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTabsetModule,
  NbThemeModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ThemeModule } from "app/@theme/theme.module";
import { SharedModule } from "app/shared/shared.module";
import { FormlyModule } from "@ngx-formly/core";
import { ConditionComponent } from './condition/condition.component';
import { SimpleConditionComponent } from './condition/simple-condition/simple-condition.component';
import { ScriptConditionComponent } from './condition/script-condition/script-condition.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
@NgModule({
  declarations: [
    DesignerComponent,
    BusinessRuleListComponent,
    BusinessRuleComponent,
    ActivityRuleDesignerComponent,
    ConditionComponent,
    SimpleConditionComponent,
    ScriptConditionComponent,
  ],
  imports: [
    CommonModule,
    BusinessRuleRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NbTreeGridModule,
    DragDropModule,
    NbThemeModule,
    ThemeModule,
    SharedModule,
    FormlyModule.forChild(),
    NbTabsetModule,
    AceEditorModule    ,
    MonacoEditorModule
    
  
  ],
})
export class BusinessRuleModule {}
