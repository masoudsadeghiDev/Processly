import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "fullname",
      type: "nb-input",
      templateOptions: {
        label: "نام و نام خانوادگی",
        placeholder: "نام و نام خانوادگی خود را وارد کنید",
        required: true,
        type: "text",
        shape: "rectangle",
      },
    },
    {
      key: "username",
      type: "nb-input",
      templateOptions: {
        label: "پست الکترونیک",
        placeholder: "پست الکترونیک خود را وارد کنید",
        required: true,
        type: "text",
        shape: "rectangle",
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
      key: "repeatpassword",
      type: "nb-input",
      templateOptions: {
        label: "تایید رمز عبور",
        placeholder: "رمزعبور خود را مجدد وارد کنید",
        required: true,
        type: "password",
      },
    },
    {
      key: "conditions",
      type: "checkbox",
      defaultValue: false,
      className: "text-right rtl text-secondary small",
      templateOptions: {
        label: "با قوانین موافقم!",
      }
    }
  ];
  constructor() {}

  ngOnInit(): void {}

  onSubmit(model) {}

}
