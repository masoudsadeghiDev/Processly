import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { BaseService } from "app/shared/services/base.service";

@Component({
  selector: "ngx-new-request",
  templateUrl: "./new-request.component.html",
  styleUrls: ["./new-request.component.scss"],
})
export class NewRequestComponent implements OnInit {
  processId: number;
  activityId: number;
  entityId: number;
  form = new FormGroup({ name: new FormControl() });
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  name = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private base: BaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ activityId, processId,entityId }) => {
      this.processId = processId;
      this.activityId = activityId;
      this.entityId = entityId;
      this.onGetData();
    });
  }

  onGetData() {
    this.base.get(`task/form/${this.activityId}`).subscribe((form) => {
      this.fields = (form.fields as any[]).map(({ fieldUi }) =>
        JSON.parse(fieldUi)
      );
      this.name = form.displayName ? form.displayName : form.name;
    });
  }

  onSubmit() {
    const body = {
      currentStatus:parseInt( this.activityId+""),
      processId: parseInt(this.processId + ""),
      entityId: parseInt(this.entityId + ""),
      data: this.model,
    };
    this.base.post("entity/data/first", body).subscribe(this.goBack.bind(this));
  }

  goBack() {
    this.router.navigate(["cartable/my-request"]);
  }
}
