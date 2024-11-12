import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  SnapSettingsModel,
  LayoutModel,
  DataSourceModel,
  TextModel,
} from "@syncfusion/ej2-angular-diagrams";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { BaseService } from "app/shared/services/base.service";

@Component({
  selector: "ngx-organization-chart",
  templateUrl: "./organization-chart.component.html",
  styleUrls: ["./organization-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationChartComponent implements OnInit {
  menu = [];
  organizationId = 0;
  @ViewChild("diagram")
  public diagram: DiagramComponent;
  public snapSettings: SnapSettingsModel = {
    constraints: 0,
  };
  public items: DataManager;
  public layout: LayoutModel = {
    //set the type as Organizational Chart
    type: "OrganizationalChart",
  };
  public dataSourceSettings: DataSourceModel;
  newPosition = null;
  constructor(
    private base: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  //Initializes data source
  public data: object[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ organizationId }) => {
      this.organizationId = organizationId;
      this.getChart();
    });
  }

  getChart() {
    this.base
      .get(`organization/chart/${this.organizationId}`)
      .subscribe((posts) => {
        this.data = posts;
        this.items = new DataManager(posts as JSON[]);
        this.dataSourceSettings = {
          id: "id",
          parentId: "parentId",
          dataSource: this.items,
        };
      });

    this.base
      .get(`organization/chart/menu/${this.organizationId}`)
      .subscribe((posts) => {
        this.menu = posts;
      });
  }

  drop({ previousIndex }) {
    const newPosition = this.menu[previousIndex];
    this.data.push(newPosition);

    this.items = new DataManager(this.data as JSON[]);
    this.dataSourceSettings = {
      id: "id",
      parentId: "parentId",
      dataSource: this.items,
    };
    this.newPosition = newPosition;
  }

  onSelectNode({ name, element }) {
    if (name && element) {
      if (name == "click" && this.newPosition && element.data) {
        this.base
          .post("organization/chart/setParent", {
            parentId: element.data.id,
            id: this.newPosition.id,
          })
          .subscribe(() => {
            this.newPosition = null;
            this.getChart();
          });
      }
    }
  }

  goBack() {
    this.router.navigate(["admin/organization/detaile"], {
      queryParams: { organizationId: this.organizationId },
    });
  }

  //Sets the default properties for all the Nodes
  public getNodeDefaults(obj: NodeModel, diagram: Diagram): NodeModel {
    obj.shape = {
      type: "Text",
      content: (
        obj.data as {
          displayName: "string";
        }
      ).displayName,
    };
    obj.style = {
      fill: "None",
      strokeColor: "none",
      strokeWidth: 2,
      bold: true,
      color: "white",
      textAlign: "Left",
    };
    obj.borderColor = "white";
    obj.backgroundColor = "#6BA5D7";
    obj.borderWidth = 1;
    obj.width = 75;
    obj.height = 40;
    (obj.shape as TextModel).margin = {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    };
    return obj;
  }
  //Sets the default properties for all the connectors
  public getConnectorDefaults(
    connector: ConnectorModel,
    diagram: Diagram
  ): ConnectorModel {
    connector.style = {
      strokeColor: "#6BA5D7",
      strokeWidth: 2,
    };
    connector.targetDecorator.style.fill = "#6BA5D7";
    connector.targetDecorator.style.strokeColor = "#6BA5D7";
    connector.type = "Orthogonal";
    return connector;
  }
}
