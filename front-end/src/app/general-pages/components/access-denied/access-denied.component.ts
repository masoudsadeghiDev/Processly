import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'ngx-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.authService.goHome();
  }

}
