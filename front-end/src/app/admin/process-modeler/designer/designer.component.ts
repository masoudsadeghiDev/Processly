import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter,
  OnInit,
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { BaseService } from "app/shared/services/base.service";
import { basename } from "path";
import {
  NbDialogService,
  NbIconLibraries,
  NbSidebarService,
} from "@nebular/theme";
import { LayoutService } from "app/@core/utils";
import { ActivatedRoute, Router } from "@angular/router";
import { ImportProcessDialogComponent } from "../import-process-dialog/import-process-dialog.component";

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
  redirectUrl = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private base: BaseService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private dialogService: NbDialogService
  ) {
    
  }

  async ngOnInit() {
    this.bpmnJS = new BpmnJS();
    document.onfullscreenchange = this.fullscreenChangeHandler.bind(this);

    this.bpmnJS.on("import.done", (event) => {});

    this.route.queryParams.subscribe(({ id, name, imp, redirectUrl }) => {
      this.redirectUrl = redirectUrl;
      if (imp) {
        this.importProcess();
      } else {
        this.setProcess(id, name);
      }
    });

    this.bpmnJS.get("eventBus").on("selection.changed", function (event) {});

    this.bpmnJS.get("eventBus").on("shape.added", (e) => {
      var element = e.element;
      var modeling = this.bpmnJS.get("modeling");

      if (typeof modeling.setColor == "function") {
        const color = this.getElementColor(element.type);
        setTimeout(() => {
          modeling.setColor(element, {
            stroke: color,
          });
          modeling.updateProperties(element, {
            id: `${element.id}_${this.processId}`
          });
        }, 1);
      }
    });
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  setProcess(id, name) {
    this.processId = id;
    this.processName = name;
    this.base.get(`process/xml/${id}`).subscribe(async (process) => {
      if (process) {
        const { xml } = process;
        if (xml != null && xml != "") {
          await this.bpmnJS.importXML(xml);
        } else {
          await this.bpmnJS.importXML(this.getDefaultXml(name));
        }
      }
    });
  }

  importProcess() {
    this.dialogService
      .open(ImportProcessDialogComponent, {})
      .onClose.subscribe(async (result) => {
        if (result.processId && result.processName) {
          const { processId, processName, xml } = result;
          this.processId = processId;
          this.processName = processName;
          await this.bpmnJS.importXML(xml);
        }
      });
  }
  async saveXml() {
    const { xml } = await this.bpmnJS.saveXML({ format: true });

    this.base
      .post("process/xml", { xml, id: this.processId })
      .subscribe(this.goBack.bind(this));
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

  getDefaultXml(processName) {
    return `'<?xml version="1.0" encoding="UTF-8"?>
            <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
              <bpmn2:collaboration id="Collaboration_1uo33u4">
                <bpmn2:participant id="Participant_1ha7ydp" name="${processName}" processRef="Process_1" />
              </bpmn2:collaboration>
              <bpmn2:process id="Process_1" isExecutable="false">
                <bpmn2:startEvent id="StartEvent_1" />
              </bpmn2:process>
              <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1uo33u4">
                  <bpmndi:BPMNShape id="Participant_1ha7ydp_di" bpmnElement="Participant_1ha7ydp" isHorizontal="true">
                    <dc:Bounds x="150" y="93" width="600" height="250" />
                  </bpmndi:BPMNShape>
                  <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
                    <dc:Bounds x="200" y="162" width="36" height="36" />
                  </bpmndi:BPMNShape>
                </bpmndi:BPMNPlane>
              </bpmndi:BPMNDiagram> 
          </bpmn2:definitions>'`;
  }

  getElementColor(type: string) {
    type = type.toLowerCase();

    if (type.includes("task")) {
      return "#51c4d3";
    } else if (type.includes("gateway") || type.includes("startevent")) {
      return "#ffe268";
    } else if (type.includes("event")) {
      return "#ce1212";
    } else {
      return "#376bfb";
    }
  }

  goBack() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate(["/admin/process-modeler/list"]);
    }
  }
}
