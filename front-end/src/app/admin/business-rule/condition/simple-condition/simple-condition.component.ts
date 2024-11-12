import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { BaseService } from "app/shared/services/base.service";

import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  displayName: string;
  data: any;
  kind: string;
}

@Component({
  selector: "ngx-simple-condition",
  templateUrl: "./simple-condition.component.html",
  styleUrls: ["./simple-condition.component.scss"],
})
export class SimpleConditionComponent implements OnInit {
  form = new FormGroup({ name: new FormControl() });
  model = {};
  fields: FormlyFieldConfig[] = [];
  processId = 0;
  flowId: number = 0;
  condition = "";
  data = [];
  column = "displayName";
  allColumns = [this.column];
  paletDataSource: NbTreeGridDataSource<FSEntry>;
  reditectUrl = "";
  conditions = {};
  operator = "&&";

  constructor(
    private base: BaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>
  ) {
    this.paletDataSource = this.dataSourceBuilder.create([]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      ({ diagramId, processId, reditectUrl }) => {
        this.reditectUrl = reditectUrl;
        this.processId = processId;
        this.base
          .get("node/byDiagramID/" + diagramId)
          .subscribe(({ id, condition }) => {
            this.flowId = id;
            this.condition = condition;
          });
      }
    );

    this.getModels();
  }

  getModels() {
    this.base
      .get(`entity/list/rule-design/${this.processId}`)
      .subscribe((data) => {
        this.paletDataSource = this.dataSourceBuilder.create([data]);
        this.data = [data];
      });
  }

  dropOnForm(event) {
    const data = event.item.data;
    const field = {
      key: `rule_${this.fields.length + 1}`,
      type: "rule",
      templateOptions: {
        data,
        getCondition: this.getCondition.bind(this),
        // onDelete: this.onDelete.bind(this),
      },
    };
    this.fields.push(field);
    // rule
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getCondition(key, condition) {
    this.conditions[key] = condition;
  }
  changeOperator() {
    if (this.operator == "&&") {
      this.operator = "||";
    } else {
      this.operator = "&&";
    }
  }
  submit() {
    let finalCondition = "";
    const keys = Object.keys(this.conditions);
    if (keys.length > 0) {
      if (keys.length > 1) {
        for (let i = 0; i <= keys.length - 2; i++) {
          finalCondition += this.conditions[keys[i]] + this.operator;
        }
        finalCondition += this.conditions[keys[keys.length - 1]];
      } else {
        finalCondition = this.conditions[keys[0]];
      }

      this.base
        .post("node/flow/setCondition", {
          flowId: this.flowId,
          condition: finalCondition,
        })
        .subscribe(this.goBack.bind(this));
    }
  }
  goBack() {
    this.router.navigate([this.reditectUrl], {
      queryParams: { id: this.processId },
    });
  }
}
