import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, ElementRef, Input, ViewChild } from "@angular/core";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbTabsetComponent,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { BaseService } from "app/shared/services/base.service";
import { FormItemDeleteAlertComponent } from "../form-item-delete-alert/form-item-delete-alert.component";
import { FormNameDialogComponent } from "../form-name-dialog/form-name-dialog.component";
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
  selector: "ngx-form-designer",
  templateUrl: "./form-designer.component.html",
  styleUrls: ["./form-designer.component.scss"],
})
export class FormDesignerComponent implements OnInit {
  form = new FormGroup({ name: new FormControl() });
  model = {};
  fields: FormlyFieldConfig[] = [];
  formName = "";
  data = [];
  processId: number;
  activityId: number;
  settingFeild: any;
  editing = false;

  column = "displayName";
  allColumns = [this.column];

  settingForm = new FormGroup({
    disabled: new FormControl(),
    visible: new FormControl(),
    required: new FormControl(),
  });

  paletDataSource: NbTreeGridDataSource<FSEntry>;
  @ViewChild("tabset") tabsetEl: NbTabsetComponent;
  @ViewChild("pallet") pallet;
  @ViewChild("setting") setting;

  constructor(
    private base: BaseService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private router: Router,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>
  ) {
    this.paletDataSource = this.dataSourceBuilder.create([]);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(this.setRedirectProcessId.bind(this));
    this.getModels();
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

  dropOnForm(event) {
    const attribute = event.item.data;

    const { primitiveType, type, name, displayName } = attribute;
    let formItem = {
      key: name,
      name,
      wrappers: ["edit"],
      templateOptions: {
        value: true,
        label: displayName,
        placeholder: displayName,
        onDelete: this.onDelete.bind(this),
        onFocus: this.onFocus.bind(this),
        disabled: false,
        required: false,
        visible: true,
      },
    };


    if (type == "PRIMITIVE") {
      switch (primitiveType) {
        case "integer":
          formItem.templateOptions["type"] = "number";
        case "string":
        case "long":
        case "double":
        case "short":
        case "float":
        case "boolean":
        case "string":
          formItem["type"] = "nb-input";
          break;
      }

    } else if (type == "ONE_TO_ONE" || type =="MANY_TO_ONE") {
      formItem["type"] = "nb-select";
      formItem.templateOptions["options"] = attribute.options;
      formItem.templateOptions["setIdModel"] = true;
    }

    
    const map = new Map();
    this.fields.forEach((f) => map.set(f.name, f));
    map.set(formItem.name, formItem);
    this.fields = [...map.values()];
    console.log( this.fields);
  }

  openWithoutBackdrop(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
      hasBackdrop: false,
    });
  }

  goBack() {
    this.router.navigate(["/admin/form-modeler/designer"], {
      queryParams: { id: this.processId },
    });
  }

  setRedirectProcessId({ processId, activityId }) {
    this.processId = processId;
    this.activityId = activityId;
    this.base.get("form/" + activityId).subscribe((form) => {
      if (form) {
        this.formName = form.name;
        this.toFormField(form.fields);
      } else {
        this.dialogService
          .open(FormNameDialogComponent)
          .onClose.subscribe((name) => {
            if (name) {
              this.formName = name;
            }
          });
      }
    });
  }

  getModels() {
    this.base
      .get(`entity/list/form-design/${this.processId}`)
      .subscribe((data) => {
        this.paletDataSource = this.dataSourceBuilder.create([data]);
        this.data = [data];
      });
  }

  onDelete(key) {
    this.dialogService
      .open(FormItemDeleteAlertComponent, {})
      .onClose.subscribe((result) => {
        if (result) {
          this.fields = this.fields.filter((item) => item.key != key);
        }
      });
  }
  onFocus(key) {
    if (!this.editing) {
      const fields = this.fields.filter((item) => item.key == key);
      if (this.fields.length > 0) {
        this.settingFeild = fields[0];
        this.settingForm.patchValue(this.settingFeild.templateOptions);
        this.tabsetEl.selectTab(this.setting);
        this.editing = true;
        // setTimeout(this.closePallet.bind(this), 4000);
      }
    } else {
      this.closePallet();
    }
  }

  closePallet() {
    this.tabsetEl.selectTab(this.pallet);
    this.editing = false;
    this.settingFeild.templateOptions = {
      ...this.settingFeild.templateOptions,
      ...this.settingForm.value,
    };
    const map = new Map();
    this.fields.forEach((f) => map.set(f.key, f));
    map.set(this.settingFeild.key, this.settingFeild);
    this.fields = [...map.values()];
    this.settingFeild = null;
    this.settingForm.reset();
  }

  submit() {
    this.base
      .post("form/save", {
        name: this.formName,
        activityId: this.activityId,
        fields: this.toDbField(),
      })
      .subscribe(this.goBack.bind(this));
  }

  toFormField(dbField: any[]) {
    this.fields = dbField.map((field) => {
      let result = {
        ...JSON.parse(field.fieldUi),
        wrappers: ["edit"],
      };
      result.templateOptions = {
        ...result.templateOptions,
        onDelete: this.onDelete.bind(this),
        onFocus: this.onFocus.bind(this),
      };
      return result;
    });
  }
  toDbField() {
    return this.fields.map((field) => {
      delete field["wrappers"];
      return {
        fieldUi: JSON.stringify(field),
      };
    });
  }
}

