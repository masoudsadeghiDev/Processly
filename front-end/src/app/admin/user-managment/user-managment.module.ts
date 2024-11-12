import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserManagmentRoutingModule } from "./user-managment-routing.module";
import { UserManagmentComponent } from "./user-managment.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbButtonModule, NbCardModule, NbInputModule, NbRadioModule, NbSelectModule } from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from "ngx-image-cropper";
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';

@NgModule({
  declarations: [
    UserManagmentComponent,
    RegisterUserComponent,
    UserListComponent,
    AvatarDialogComponent,
    UserInfoDialogComponent,
  ],
  imports: [
    CommonModule,
    UserManagmentRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatIconModule,
    NbSelectModule  ,
    NbRadioModule
  ],
})
export class UserManagmentModule {}
