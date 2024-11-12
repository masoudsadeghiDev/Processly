import { Component, OnInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { LayoutService } from "app/@core/utils";

@Component({
  selector: "ngx-application",
  template: `
    <ngx-one-column-layout [showMenu]="showMenu">
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  styleUrls: ["./application.component.scss"],
})
export class ApplicationComponent implements OnInit {
  showMenu = false;
  constructor() {}

  ngOnInit(): void {}
}
