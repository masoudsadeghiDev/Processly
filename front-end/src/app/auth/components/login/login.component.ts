import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "username",
      type: "nb-input",
      templateOptions: {
        label: "نام کاربری",
        placeholder: "نام کاربری خود را وارد کنید",
        required: true,
        type: "text",
        shape: "rectangle",
        fullWith:true
      },
    },
    {
      key: "password",
      type: "nb-input",
      templateOptions: {
        label: "رمزعبور",
        placeholder: "رمزعبور خود را وارد کنید",
        required: true,
        type: "password",
      },
    },
    {
      key: "rememberPass",
      type: "checkbox",
      defaultValue: false,
      className: "text-right rtl text-secondary small",
      templateOptions: {
        label: "مرا بخاطر بسپار",
      },
    },
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //
  }

  onSubmit(model) {
    const { username, password } = model;
    this.authService.login(username, password);
  }
}
