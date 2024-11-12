import { Injectable } from "@angular/core";
import { BaseService } from "app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  _organizationId: number;
  _subItemName: string = "Position";

  constructor(private base: BaseService) {}

  set organizationId(id) {
    this._organizationId = id;
  }

  get organizationId() {
    return this._organizationId;
  }

  createSubItem(data) {
    return this.base.post(
      `organization/${this._subItemName}/${this._organizationId}`,
      data
    );
  }

  getSubItem() {
    return this.base.get(
      `organization/${this._subItemName}/${this._organizationId}`
    );
  }

  getAllSubItem(organId) {
    return this.base.get(
      `organization/subItems/${organId}`
    );
  }

  createOrganization(data) {
    return this.base.post("organization", data);
  }
  getOrganization() {
    return this.base.get("organization");
  }

  setSubItem(tabTitle) {
    switch (tabTitle) {
      case "پست سازمانی": {
        this._subItemName = "Position";
        break;
      }
      case "گروه": {
        this._subItemName = "Area";
        break;
      }
      case "نقش": {
        this._subItemName = "BusinessRole";
        break;
      }
      case "توانایی": {
        this._subItemName = "Skill";
        break;
      }
      default:
        this._subItemName = "";
    }
  }
}
