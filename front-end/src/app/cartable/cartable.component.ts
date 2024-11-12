import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./cartable-menu";

@Component({
  selector: "ngx-cartable",
  styleUrls: ["./cartable.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class CartableComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() {}
  ngOnInit(): void {}
}
