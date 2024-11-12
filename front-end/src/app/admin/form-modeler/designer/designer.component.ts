import {
  AfterContentInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from "@angular/core";
import * as BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { BaseService } from "app/shared/services/base.service";
import {
  NbDialogService,
  NbIconLibraries,
  NbSidebarService,
} from "@nebular/theme";
import { LayoutService } from "app/@core/utils";
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorDialogComponent } from "app/shared/components/error-dialog/error-dialog.component";
@Component({
  selector: "app-diagram",
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      .on("element.dblclick", 10000, this.navigateToFormBilder.bind(this));

    this.bpmnJS
      .get("eventBus")
      .on("shape.added", this.setElementColor.bind(this));
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
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
  fullscreenChangeHandler() {
    this.fullscreen = !this.fullscreen;
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();
  }

  getElementColor(type: string) {
    type = type.toLowerCase();

    if (type.includes("task")) {
      return "#51c4d3";
    } else {
      return "#000000";
    }
  }

  navigateToFormBilder({ element }) {
    const diagramId = element.id;

    this.base.get("node/byDiagramID/" + diagramId).subscribe((node) => {
      const { type } = element;
      if (type == "bpmn:Task") {
        this.router.navigate(["/admin/form-modeler/form-designer"], {
          queryParams: { processId: this.processId, activityId: node.id },
        });
      }
    });
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

  setXml({ id }) {
    this.processId = id;
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
    this.router.navigate(["/admin/form-modeler/list"]);
  }
}
