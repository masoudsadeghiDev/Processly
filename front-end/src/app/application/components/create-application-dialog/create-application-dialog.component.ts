import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { ApplicationService } from "app/shared/services/application.service";
import { BaseService } from "app/shared/services/base.service";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "ngx-create-application-dialog",
  templateUrl: "./create-application-dialog.component.html",
  styleUrls: ["./create-application-dialog.component.scss"],
})
export class CreateApplicationDialogComponent implements OnInit {
  file: File;
  imgURL: any;
  form = new FormGroup({
    name: new FormControl(),
    image: new FormControl(),
  });
  croppedImage;
  imageChangedEvent: any = "";
  constructor(
    private base: BaseService,
    private applicationSerice: ApplicationService,
    protected ref: NbDialogRef<CreateApplicationDialogComponent>
  ) {}

  ngOnInit(): void {}

  submit() {
    const image = this.croppedImage.replace("data:image/png;base64,", "");
    this.base.post("file/upload/base64", image).subscribe(({ url }) => {
      const appName = this.form.value.name;
      this.base
        .post("application", {
          image: url,
          name: appName,
          displayName: appName,
        })
        .subscribe(() => {
          this.ref.close();
          this.applicationSerice.getApplicationList();
        });
    });
  }

  handleFileInput(event) {
    this.imageChangedEvent = event;
    // this.file = file;

    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    // };
  }

  dismiss() {
    this.ref.close();
  }
  disabled() {
    this.disabled = this.form.value.name == "" || this.imgURL;
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
