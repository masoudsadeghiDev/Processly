import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-data-modeler",
  styleUrls: ["./data-modeler.component.scss"],
  template: ` <router-outlet></router-outlet> `,
})
export class DataModelerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
