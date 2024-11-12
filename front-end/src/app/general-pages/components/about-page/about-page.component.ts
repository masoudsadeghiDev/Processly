import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToHome(){

    this.router.navigate(['/general/home'])
  }

}
