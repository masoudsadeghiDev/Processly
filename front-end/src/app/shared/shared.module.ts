import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragComponent } from "./components/shared/drag/drag.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [DragComponent],
  imports: [CommonModule, DragDropModule],
  exports: [DragComponent],
})
export class SharedModule {}
  