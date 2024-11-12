import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ngx-description-item",
  templateUrl: "./description-item.component.html",
  styleUrls: ["./description-item.component.scss"],
})
export class DescriptionItemComponent implements OnInit {
  @Input() title: "";
  @Input() text: "";

  constructor() {}

  ngOnInit(): void {}
}
