import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import {
  NbAlertModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
} from "@nebular/theme";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbCardModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
