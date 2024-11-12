import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "ngx-avatar-dialog",
  templateUrl: "./avatar-dialog.component.html",
  styleUrls: ["./avatar-dialog.component.scss"],
})
export class AvatarDialogComponent implements OnInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  constructor(protected ref: NbDialogRef<AvatarDialogComponent>) {}

  ngOnInit(): void {}
  submit() {
    this.ref.close(this.croppedImage);
  }

  dismiss() {
    this.ref.close(null);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
