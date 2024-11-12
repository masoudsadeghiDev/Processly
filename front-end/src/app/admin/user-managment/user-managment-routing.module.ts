import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserManagmentComponent } from "./user-managment.component";

const routes: Routes = [
  {
    path: "",
    component: UserManagmentComponent,
    children: [
      {
        path: "register",
        component: RegisterUserComponent,
      },
      {
        path: "list",
        component: UserListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagmentRoutingModule {}
