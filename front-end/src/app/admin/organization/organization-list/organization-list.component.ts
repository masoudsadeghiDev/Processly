import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersianDatePipe } from "app/shared/pipe/persian-date.pipe";
import { BaseService } from "app/shared/services/base.service";
import { LocalDataSource } from "ng2-smart-table";
import { OrganizationService } from "../organization.service";

@Component({
  selector: "ngx-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"],
})
export class OrganizationListComponent implements OnInit {
  settings = {};
  tableSource: LocalDataSource = new LocalDataSource();

  constructor(
    private organService: OrganizationService,
    private router: Router,
    private pipe: PersianDatePipe
  ) {}

  ngOnInit(): void {
    this.onInitTable();
    this.onGetData();
  }

  onSelectOrgan({ data }) {
    this.router.navigate(["/admin/organization/detaile"], {
      queryParams: { organizationId: data.id },
    });
  }
  onCreateOrganization({ confirm, newData }) {
    this.organService.createOrganization(newData).subscribe(() => {
      confirm.resolve();
      this.onGetData();
      this.tableSource.refresh();
    });
  }
  onGetData() {
    this.organService.getOrganization().subscribe((list: any[]) => {
      list = list.map((item) => {
        return {
          ...item,
          submitDate: this.pipe.transform(item.submitDate),
        };
      });

      this.tableSource.load(list);
    });
  }
  onInitTable() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      actions: {
        delete: false,
        edit: false,
        columnTitle: "عملیات",
      },
      columns: {
        id: {
          title: "شناسه",
          type: "number",
          editable: false,
          addable: false,
        },
        name: {
          title: "نام ",
          type: "string",
        },
        displayName: {
          title: "نام نمایشی",
          type: "string",
        },
        description: {
          title: "توضیحات",
          type: "string",
        },
        submitDate: {
          title: "تاریخ ثبت",
          type: "string",
        },
      },
    };
  }
}
