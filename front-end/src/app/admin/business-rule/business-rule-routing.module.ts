import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityRuleDesignerComponent } from "./activity-rule-designer/activity-rule-designer.component";
import { BusinessRuleListComponent } from "./business-rule-list/business-rule-list.component";
import { BusinessRuleComponent } from "./business-rule.component";
import { ConditionComponent } from "./condition/condition.component";

import { DesignerComponent } from "./designer/designer.component";

const routes: Routes = [
  {
    path: "",
    component: BusinessRuleComponent,
    children: [
      {
        path: "list",
        component: BusinessRuleListComponent,
      },
      {
        path: "designer",
        component: DesignerComponent,
      },
      {
        path: "activity-rule-designer",
        component: ActivityRuleDesignerComponent,
      },
      {
        path: "condition",
        component: ConditionComponent,
      },
      {
        path: "**",
        redirectTo: "list",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRuleRoutingModule {}
