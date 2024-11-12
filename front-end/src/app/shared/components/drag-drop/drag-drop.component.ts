import { Component, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from "@angular/animations";

const listAnimation = trigger("listAnimation", [
  transition("* <=> *", [
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        stagger("60ms", animate("600ms ease-out", style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(":leave", animate("200ms", style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);
@Component({
  selector: "ngx-drag-drop",
  templateUrl: "./drag-drop.component.html",
  styleUrls: ["./drag-drop.component.scss"],
  animations: [listAnimation],
})
export class DragDropComponent extends FieldType implements OnInit {
  ngOnInit(): void {}
}
