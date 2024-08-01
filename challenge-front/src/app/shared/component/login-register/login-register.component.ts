import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FLoginComponent } from '../f-login/f-login.component';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
currentUrl: any;

constructor(private router: Router) {}

  ngOnInit(): void {
  
    this.currentUrl = this.router.url;
   
  }


}
