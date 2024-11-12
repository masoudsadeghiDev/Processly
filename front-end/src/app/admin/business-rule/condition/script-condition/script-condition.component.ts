import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "app/shared/services/base.service";
// import * as ace from 'ace-builds';
// import 'ace-builds/src-min-noconflict/ext-language_tools.js';
// import 'ace-builds/src-min-noconflict/snippets/javascript.js';
// import 'ace-builds/src-min-noconflict/mode-javascript.js';
// import 'ace-builds/src-min-noconflict/theme-tomorrow_night_blue.js';

@Component({
  selector: "ngx-script-condition",
  templateUrl: "./script-condition.component.html",
  styleUrls: ["./script-condition.component.scss"],
})
export class ScriptConditionComponent implements OnInit, AfterViewInit {
  @ViewChild("editor") editor;
  diagramId = "";
  // code = ``;
  options: any = { maxLines: 1000, printMargin: false, showLineNumbers: true };
  flowId: 0;
  processId: 0;
  reditectUrl: "";

  editorOptions = { theme: "vs-dark", language: "javascript" };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode: string = "function x() { // TODO }";

  constructor(
    private base: BaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      ({ diagramId, processId, reditectUrl }) => {
        this.diagramId = diagramId;
        this.reditectUrl = reditectUrl;
        this.processId = processId;
        this.base.get("node/byDiagramID/" + diagramId).subscribe(({ id }) => {
          this.flowId = id;
        });
        this.setInitCode();
      }
    );
  }

  ngAfterViewInit() {
    // this.editor.setTheme('ace/theme/tomorrow_night_blue');
    // this.editor.session.setMode('ace/mode/javascript');
    // this.editor.setTheme("eclipse");
  }

  submit() {
    this.base
      .post("node/flow/setCondition", {
        flowId: this.flowId,
        condition: this.code,
      })
      .subscribe(this.goBack.bind(this));
  }

  goBack() {
    this.router.navigate([this.reditectUrl], {
      queryParams: { id: this.processId },
    });
  }

  setInitCode() {
    this.code = `function ${this.diagramId}(){
      return false;
  }
  ${this.diagramId}();`;
  }
}
