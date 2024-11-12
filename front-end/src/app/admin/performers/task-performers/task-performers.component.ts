import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbStepperComponent } from "@nebular/theme";
import { OrganizationService } from "app/admin/organization/organization.service";
import { BaseService } from "app/shared/services/base.service";
import { BehaviorSubject } from "rxjs";
import { ChipListComponent } from "../chip-list/chip-list.component";

@Component({
  selector: "ngx-task-performers",
  templateUrl: "./task-performers.component.html",
  styleUrls: ["./task-performers.component.scss"],
})
export class TaskPerformersComponent implements OnInit {
  activityId = 0;
  processId = 0;
  organizations = [];
  positions = [];
  areas = [];
  skills = [];
  businessRoles = [];

  @ViewChild("positionChip") positionChip: ChipListComponent;
  @ViewChild("roleChip") roleChip: ChipListComponent;
  @ViewChild("skillChip") skillChip: ChipListComponent;
  @ViewChild("groupChip") groupChip: ChipListComponent;
  @ViewChild("stepper") stepper: NbStepperComponent;

  constructor(
    private organService: OrganizationService,
    private base: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ processId, activityId }) => {
      this.activityId = activityId;
      this.processId = processId;
    });
    this.organService.getOrganization().subscribe((list) => {
      this.organizations = list;
    });
  }

  selectOrgan(organId) {
    this.organService
      .getAllSubItem(organId)
      .subscribe(({ Areas, BusinessRoles, Positions, Skills }) => {
        this.areas = Areas;
        this.businessRoles = BusinessRoles;
        this.skills = Skills;
        this.positions = Positions;
        this.stepper.next();
      });
  }

  goBack() {
    this.router.navigate(["admin/performers/designer"], {
      queryParams: { activityId: this.activityId, id: this.processId },
    });
  }

  submit() {
    
    const body = {
      task: this.activityId,
      areas: this.groupChip.selectedData,
      businessRoles: this.roleChip.selectedData,
      skills: this.skillChip.selectedData,
      positions: this.positionChip.selectedData,
    };
    
    this.base.post("task/filter", body).subscribe(this.goBack.bind(this));
  }
}
