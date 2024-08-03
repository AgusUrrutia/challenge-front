import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FLoginComponent } from '../f-login/f-login.component';
import { FRegisterComponent } from '../f-register/f-register.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  standalone: true,
  imports: [FLoginComponent,FRegisterComponent,HttpClientModule]
})
export class LoginRegisterComponent {
currentUrl: any;

constructor( private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
   
  }




}
