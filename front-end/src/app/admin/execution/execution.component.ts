import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ngx-execution",
  template: ` <router-outlet></router-outlet> `,
})
export class ExecutionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ id, name }) => {});
  }
}
