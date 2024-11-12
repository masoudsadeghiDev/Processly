import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { BaseService } from "app/shared/services/base.service";

@Component({
  selector: "ngx-show-request",
  templateUrl: "./show-request.component.html",
  styleUrls: ["./show-request.component.scss"],
})
export class ShowRequestComponent implements OnInit {
  processId: number;
  activityId: number;
  requestId: number;
  form = new FormGroup({ name: new FormControl() });
  model: any;
  fields: FormlyFieldConfig[] = [];
  name = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private base: BaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ activityId, processId, requestId }) => {
      this.processId = processId;
      this.activityId = activityId;
      this.requestId = requestId;
      this.onGetData();
    });
  }

  onGetData() {
    this.base.get(`task/form/${this.activityId}`).subscribe((form) => {
      this.fields = (form.fields as any[]).map(({ fieldUi }) => {
        return {
          ...JSON.parse(fieldUi),
          disable: true,
        };
      });
      this.name = form.displayName ? form.displayName : form.name;
      this.base
        .get(`entity/data/last/${this.processId}/${this.requestId}`)
        .subscribe((model) => {
          this.model = model;
        });
    });
  }

  goBack() {
    this.router.navigate(["cartable/request-list"]);
  }

  onSubmit() {
    this.base
      .post("entity/data", {
        data: this.model,
        processId: parseInt(this.processId + ""),
        requestId: parseInt(this.requestId + ""),
      })
      .subscribe(this.goBack.bind(this));
  }
}
