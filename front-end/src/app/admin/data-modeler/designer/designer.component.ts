import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  ConnectorModel,
  ContextMenuSettingsModel,
  DataSourceModel,
  Diagram,
  DiagramComponent,
  LayoutModel,
} from "@syncfusion/ej2-angular-diagrams";
import { Node, NodeModel } from "@syncfusion/ej2-diagrams";
import { DataManager } from "@syncfusion/ej2-data";
import { BaseService } from "app/shared/services/base.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService, NbIconLibraries } from "@nebular/theme";
import { DataModelDialogComponent } from "../data-model-dialog/data-model-dialog.component";
import { AttributeDialogComponent } from "../attribute-dialog/attribute-dialog.component";
import { AttributeValueDialogComponent } from "../attribute-value-dialog/attribute-value-dialog.component";

@Component({
  selector: "ngx-designer",
  templateUrl: "./designer.component.html",
  styleUrls: ["./designer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DesignerComponent implements OnInit, AfterViewInit {
  @ViewChild("diagram")
  public diagram: DiagramComponent;
  public items: DataManager;
  public layout: LayoutModel = {
    type: "OrganizationalChart",
  };
  public dataSourceSettings: DataSourceModel;
  public entities: any[] = [];
  private processId: 0;
  public contextMenuSettings: ContextMenuSettingsModel = {
    show: true,
  };
  redirectUrl: string = null;

  constructor(
    private base: BaseService,
    private router: Router,
    iconsLibrary: NbIconLibraries,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {
    iconsLibrary.registerFontPack("ion", { iconClassPrefix: "ion" });
  }
  ngAfterViewInit(): void {
    this.diagram.contextMenuSettings = this.contextMenuSettings;
    // this.diagram.menu
  }

  ngOnInit(): void {
    this.initMenu();
    this.route.queryParams.subscribe(({ id, redirectUrl }) => {
      this.redirectUrl = redirectUrl;
      this.processId = id;
      this.getAllDataModles();
    });
  }

  getAllDataModles() {
    this.base
      .get(`entity/list/${this.processId}`)
      .subscribe((entities: any[]) => {
        this.entityToDiagramData(entities);
        this.loadModels();
      });
  }
  loadModels() {
    this.items = new DataManager(this.entities as JSON[]);
    this.dataSourceSettings = {
      id: "name",
      dataSource: this.items,
      parentId: "children",
    };
  }

  entityToDiagramData(entities: any[]) {
    this.entities = entities.map((en) => {
      let result = {
        name: en.name,
        attributes: en.attributes,
        entityType: en.entityType,
        id: en.id,
        mainModel: en.mainModel,
      };
      const children = (en.attributes as any[])
        .filter((en) => en.type != "PRIMITIVE")
        .map((en) => en.className);
      if (children.length > 0) {
        result["children"] = children;
      }
      return result;
    });
  }

  public getConnectorDefaults(
    connector: ConnectorModel,
    diagram: Diagram
  ): ConnectorModel {
    connector.style = {
      strokeColor: "#6BA5D7",
      strokeWidth: 2,
    };
    connector.targetDecorator.style.fill = "red";
    connector.targetDecorator.style.strokeColor = "#6BA5D7";
    connector.targetDecorator.shape = "None";
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";

    return connector;
  }

  public getNodeDefaults(node: NodeModel): NodeModel {
    const { attributes, name, entityType, type } = node.data as any;
    const background = entityType == "PARAMETER" ? "#2cde97" : "#6BA5D7";
    let attributesStr = "";
    if (attributes.length > 0) {
      const primitivesAttr: any[] = attributes.filter(
        (attr) => attr.type == "PRIMITIVE" && attr.name != "request"
      );
      if (primitivesAttr.length > 0) {
        attributesStr += primitivesAttr
          .map((attr) => `<div>-${attr.name}</div>`)
          .reduce((total, div) => `${total}${div}`);
      }
      const relations: any[] = attributes.filter(
        (attr) => attr.type != "PRIMITIVE"
      );
      if (relations.length > 0) {
        attributesStr += "<br/>relations :\n";
        attributesStr += relations
          .map((attr) => `<div>-${attr.name}</div>`)
          .reduce((total, div) => `${total}${div}`);
      }
    }
    node.shape = {
      content: `<div style="background: ${background}; height: 100%; width: 100%">
        <button type="button" nbButton style="width: 100%"> ${name} </button>
        ${attributesStr}
      </div>`,
      type: "HTML",
    };
    node.style.fill = "#6BA5D7";
    node.style.strokeColor = "White";
    node.height = attributes.length * 20 + 70;
    node.width = 150;

    node.data = { ...node.data, type };
    return node;
  }

  add() {
    const haveMainModel =
      this.entities.length > 0 &&
      this.entities.filter((en) => en.mainModel).length > 0;

    this.dialogService
      .open(DataModelDialogComponent, {
        context: { haveMainModel },
      })
      .onClose.subscribe((data) => {
        if (data != null) {
          this.base
            .post("entity/" + this.processId, data)
            .subscribe(this.getAllDataModles.bind(this));
        }
      });
  }

  goBack() {
    this.submit().subscribe(() => {
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
      } else {
        this.router.navigate(["/admin/data-modeler/list"]);
      }
    });
  }

  save() {
    this.submit().subscribe(this.goBack.bind(this));
  }

  submit() {
    return this.base.get("entity/submit", { processId: this.processId });
  }

  doubleClick(event) {}

  initMenu() {
    this.contextMenuSettings = {
      show: true,
      items: [
        {
          text: "Save",

          id: "save",

          target: ".e-elementcontent",

          iconCss: "e-save",
        },
        {
          text: "Load",
          id: "load",
          target: ".e-elementcontent",
          iconCss: "e-load",
        },
        {
          text: "Clear",
          id: "clear",
          target: ".e-elementcontent",
          iconCss: "e-clear",
        },
      ],
      // Hides the default context menu items
      showCustomMenuOnly: false,
    };
  }

  openArrtDialog({ button, element }) {
    if (button == "Right") {
      if (element instanceof Node) {
        const node: any = element.data;
        const { entityType } = node;
        if (entityType == "MASTER") {
          this.dialogService
            .open(AttributeDialogComponent, {
              context: {
                classNames: this.entities
                  .map((en) => en.name)
                  .filter((en) => en != node.name),
                entityId: node.id,
              },
            })
            .onClose.subscribe(this.getAllDataModles.bind(this));
        } else if (entityType == "PARAMETER") {
          this.dialogService
            .open(AttributeValueDialogComponent, {
              context: { entityId: node.id },
            })
            .onClose.subscribe(this.saveParameterValues.bind(this));
        }
      }
    }
  }

  saveParameterValues(event) {
    if (event) {
      const { values, entityId } = event;
      this.base
        .post("entity/parameter/data/" + entityId, values)
        .subscribe(this.getAllDataModles.bind(this));
    }
  }
}
