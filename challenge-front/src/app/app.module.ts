import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './shared/component/login-register/login-register.component';
import { FLoginComponent } from './shared/component/f-login/f-login.component';
import { FRegisterComponent } from './shared/component/f-register/f-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    FRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule, // Importa el MatFormFieldModule
    MatInputModule // Importa el MatInputModule si estás usando <mat-form-field> con <input matInput>
    ,
    FLoginComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
