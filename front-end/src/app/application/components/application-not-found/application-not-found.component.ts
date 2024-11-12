import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: "ngx-application-not-found",
  templateUrl: "./application-not-found.component.html",
  styleUrls: ["./application-not-found.component.scss"],
})
export class ApplicationNotFoundComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout()
  }
}
