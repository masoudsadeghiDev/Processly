import { Component, Input } from "@angular/core";

@Component({
  selector: "ngx-drag",
  template: `
    <div [cdkDragData]="data" style="height: 2rem" cdkDrag>
      {{ title }}
    </div>
  `,
})
export class DragComponent {
  @Input() title: string;
  @Input() data: any;
}
