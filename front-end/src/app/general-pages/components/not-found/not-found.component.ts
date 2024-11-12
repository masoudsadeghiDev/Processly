
import { Component } from "@angular/core";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: "ngx-not-found",
  styleUrls: ["./not-found.component.scss"],
  templateUrl: "./not-found.component.html",
})
export class NotFoundComponent {
  constructor(private authService: AuthService) {}

  goToHome() {
    this.authService.goHome();
  }
}
