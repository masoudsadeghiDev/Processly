import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PersianDatePipe } from "app/shared/pipe/persian-date.pipe";
import { LocalDataSource } from "ng2-smart-table";
import { OrganizationService } from "../organization.service";

@Component({
  selector: "ngx-organization-detaile",
  templateUrl: "./organization-detaile.component.html",
  styleUrls: ["./organization-detaile.component.scss"],
})
export class OrganizationDetaileComponent implements OnInit {
  index: 0;
  settings = {};
  tableSource: LocalDataSource = new LocalDataSource();
  organizationId = 0;
  constructor(
    private organSerice: OrganizationService,
    private routes: ActivatedRoute,
    private router: Router,
    private pipe:PersianDatePipe
  ) {}

  ngOnInit(): void {
    this.onInitTable();
    this.routes.queryParams.subscribe(({ organizationId }) => {
      this.organizationId = organizationId;
      this.organSerice.organizationId = organizationId;
      this.onGetData();
    });
  }

  onCreateSubItem({ confirm, newData }) {
    this.organSerice.createSubItem(newData).subscribe(() => {
      confirm.resolve();
      this.onGetData();
    });
  }

  onGetData() {
    this.organSerice.getSubItem().subscribe((list) => {
      list = list.map((item) => {
        return {
          ...item,
          submitDate: this.pipe.transform(item.submitDate),
        };
      });
      this.tableSource.load(list);
      this.tableSource.refresh();
    });
  }

  showChart() {
    this.router.navigate(["admin/organization/chart"], {
      queryParams: { organizationId: this.organizationId },
    });
  }

  changeTab({ tabTitle }) {
    this.organSerice.setSubItem(tabTitle);
    this.onGetData();
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
