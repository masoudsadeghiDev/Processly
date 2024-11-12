import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbDialogService,
  NbIconLibraries,
  NbSidebarService,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { LayoutService } from "app/@core/utils/layout.service";
import { ErrorDialogComponent } from "app/shared/components/error-dialog/error-dialog.component";
import { BaseService } from "app/shared/services/base.service";
import * as BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
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
  selector: "ngx-designer",
  templateUrl: "./designer.component.html",
  styleUrls: ["./designer.component.scss"],
})
export class DesignerComponent implements OnInit, AfterContentInit {
  @ViewChild("ref", { static: true }) private el: ElementRef;
  bpmnJS: BpmnJS;
  processName = "";
  processId: number;
  initDiagramXML = "";
  fullscreen = false;
  redirectUrl = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: BaseService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    iconsLibrary: NbIconLibraries,
    private dialogService: NbDialogService
  ) {

  }

  async ngOnInit() {
    this.bpmnJS = new BpmnJS();
    document.onfullscreenchange = this.fullscreenChangeHandler.bind(this);

    this.route.queryParams.subscribe(this.setXml.bind(this));

    this.bpmnJS
      .get("eventBus")
      .on("element.dblclick", 10000, this.selectFlow.bind(this));

    this.bpmnJS
      .get("eventBus")
      .on("shape.added", this.setElementColor.bind(this));
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  setXml({ id, redirectUrl }) {
    this.processId = id;
    this.redirectUrl = redirectUrl;
    this.base.get(`process/xml/${id}`).subscribe(async (process) => {
      if (process) {
        const { xml } = process;
        if (xml != null && xml != "") {
          await this.bpmnJS.importXML(xml);
        }
      }
    });
    this.haveEntity();
  }

  fullscreenChangeHandler() {
    this.fullscreen = !this.fullscreen;
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();
  }

  setElementColor(e) {
    var element = e.element;
    var modeling = this.bpmnJS.get("modeling");

    if (typeof modeling.setColor == "function") {
      const color = this.getElementColor(element.type);
      setTimeout(() => {
        modeling.setColor(element, {
          stroke: color,
        });
      }, 1);
    }
  }
  getElementColor(type: string) {
    type = type.toLowerCase();

    if (type.includes("gateway")) {
      return "#ffe268";
    } else {
      return "#000000";
    }
  }
  selectFlow({ element }) {
    
    const { type, id } = element;

    if (type == "bpmn:SequenceFlow") {
      this.base
        .get(`node/flow/connectedToGateway/${id}`)
        .subscribe((response) => {
          if (response)
            this.router.navigate(["/admin/business-rule/condition"], {
              queryParams: {
                diagramId: id,
                processId: this.processId,
                reditectUrl: `/admin/business-rule/designer`,
              },
            });
        });
    }
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  haveEntity() {
    this.base
      .get("entity/haveEntity/" + this.processId)
      .subscribe((haveEntity) => {
        if (!haveEntity) {
          this.dialogService
            .open(ErrorDialogComponent, {
              context: {
                title: "اخطار",
                discription:
                  "مدل داده برای این فرایند تعریف نشده ابتدا مدل داده ای خود را طراحی کنید",
              },
            })
            .onClose.subscribe(this.goBack.bind(this));
        }
      });
  }

  goBack() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate(["/admin/business-rule/list"]);
    }
  }
}
