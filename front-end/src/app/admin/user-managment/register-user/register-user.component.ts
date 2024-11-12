import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { OrganizationService } from "app/admin/organization/organization.service";
import { BaseService } from "app/shared/services/base.service";
import * as bcrypt from "bcryptjs";
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";

@Component({
  selector: "ngx-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"],
})
export class RegisterUserComponent implements OnInit {
  image = null
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    name: new FormControl(),
    family: new FormControl(),
    email: new FormControl(),
    role: new FormControl(),
    organization: new FormControl(),
    position: new FormControl(),
    area: new FormControl(),
    skills: new FormControl(),
    businessRole: new FormControl(),
  });
  organizations = [];
  skills = [];
  businessRoles = [];
  areas = [];
  positions = [];
  isValidEmail = true;

  constructor(
    private base: BaseService,
    private router: Router,
    private dialogService: NbDialogService,
    private organService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

  fileChangeEvent(event: any): void {
    this.dialogService
      .open(AvatarDialogComponent, {
        context: { imageChangedEvent: event },
      })
      .onClose.subscribe((croppedImage) => {
        this.image = croppedImage;
      });
  }

  onGetData() {
    this.organService.getOrganization().subscribe((list) => {
      this.organizations = list;
    });
  }
  selectOrgan(organId) {
    this.organService
      .getAllSubItem(organId)
      .subscribe(({ Areas, BusinessRoles, Positions, Skills }) => {
        this.areas = Areas;
        this.businessRoles = BusinessRoles;
        this.positions = Positions;
        this.skills = Skills;
      });
  }

  goBack() {
    this.router.navigate(["/admin/user-managment/list"]);
  }

  submit() {
    const image = this.image.replace("data:image/png;base64,", "");
    const {
      username,
      name,
      family,
      email,
      organization,
      position,
      area,
      skills,
      businessRole,
      role
    } = this.form.value;
    this.base.post("file/upload/base64", image).subscribe(({ url }) => {
      const user = {
        role,
        username,
        password: this.hashPassword(),
        name,
        family,
        email,
        profile: url,
        organization,
        position,
        area,
        businessRole,
        skills,
      };
      this.base.post("user/register", user).subscribe(this.goBack.bind(this));
    });
  }

  validateEmail(email) {
    if (!email || email == "") {
      return true;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.isValidEmail = re.test(String(email).toLowerCase());
  }
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(this.form.value.password, salt);
  }
}
