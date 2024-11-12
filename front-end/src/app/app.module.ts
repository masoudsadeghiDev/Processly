/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { NbInputComponent } from "./shared/components/nb-input/nb-input.component";
import { CKEditorModule } from "ng2-ckeditor";
import { EditorComponent } from "./shared/components/editor/editor.component";
import { NbTextAreaComponent } from "./shared/components/nb-text-area/nb-text-area.component";
import { AuthService } from "./shared/services/auth.service";
import { BaseService } from "./shared/services/base.service";
import { TokenInterceptor } from "./shared/utility/token.interceptor";
import { ApplicationService } from "./shared/services/application.service";
import { ContainerComponent } from "./shared/components/container/container.component";
import { DragDropComponent } from "./shared/components/drag-drop/drag-drop.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { NbButttonComponent } from "./shared/components/nb-buttton/nb-buttton.component";
import { NbSelectComponent } from "./shared/components/nb-select/nb-select.component";
import { NbCheckboxComponent } from "./shared/components/nb-checkbox/nb-checkbox.component";
import { NbRadioGroupComponent } from "./shared/components/nb-radio-group/nb-radio-group.component";
import { DatePickerComponent } from "./shared/components/date-picker/date-picker.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from "./shared/components/date-picker/material.persian-date.adapter";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { PersianDatePipe } from "./shared/pipe/persian-date.pipe";
import { FormEidtWrapperComponent } from "./shared/components/form-eidt-wrapper/form-eidt-wrapper.component";
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { RuleComponent } from "./shared/components/rule/rule.component";


@NgModule({
  declarations: [
    AppComponent,
    NbInputComponent,
    EditorComponent,
    NbTextAreaComponent,
    ContainerComponent,
    DragDropComponent,
    HeaderComponent,
    NbButttonComponent,
    NbSelectComponent,
    NbCheckboxComponent,
    NbRadioGroupComponent,
    DatePickerComponent,
    PersianDatePipe,
    FormEidtWrapperComponent,
    ErrorDialogComponent,  
    RuleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
    FormlyModule.forChild({
      types: [
        { name: "nb-input", component: NbInputComponent },
        { name: "nb-textarea", component: NbTextAreaComponent },
        { name: "nb-header", component: HeaderComponent },
        { name: "nb-button", component: NbButttonComponent },
        { name: "nb-select", component: NbSelectComponent },
        { name: "nb-group", component: NbRadioGroupComponent },
        { name: "nb-checkbox", component: NbCheckboxComponent },
        { name: "datepicker", component: DatePickerComponent },
        { name: "rule", component: RuleComponent },
      ],
      wrappers: [
        { name: "container", component: ContainerComponent },
        { name: "edit", component: FormEidtWrapperComponent },
      ],
    }),
    CKEditorModule,
    NbCardModule,
    NbInputModule,
    NbThemeModule,
    NbButtonModule,
    NbSelectModule,
    NbCheckboxModule,
    NbRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    NbIconModule,
    NbLayoutModule,
    NbActionsModule

  
  ],
  bootstrap: [AppComponent],
  providers: [
    ApplicationService,
    AuthService,
    BaseService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    PersianDatePipe,
  ],
})
export class AppModule {}
