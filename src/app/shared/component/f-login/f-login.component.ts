import { Component, ChangeDetectionStrategy, signal, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { merge } from 'rxjs';

@Component({
  selector: 'app-f-login',
  templateUrl: './f-login.component.html',
  styleUrls: ['./f-login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLoginComponent {
  form: FormGroup;
  hide = signal(true);
  error: any = null;

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.nullValidator]);
  errEmail = signal('');
  errPass = signal('');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: this.email,
      password: this.password
    });

    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErr());
  }

  onUpload(): void {
    
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('email', this.form.get('email')?.value);
      formData.append('password', this.form.get('password')?.value);

      this.auth.login(formData).subscribe(
        response => {
          console.log("Logeado!!!");
          this.router.navigate(['/dashboard']);
        },
        error => {  
          this.error = error.error.message;
          this.manejoDeErrorServer(error);
        }
      );
    }
  }

  updateErr() {
    if (this.email.hasError('required')) {
      this.errEmail.set('Ingresa un email valido');
    } else if (this.email.hasError('email')) {
      this.errEmail.set('Falta la dirección de correo ej: @example.com');
    } 
    // else {
    //   this.errEmail.set('');
    // }

    if (this.password.hasError('required')) {
      this.errPass.set('Ingresa una contraseña');
    } 
    // else {
    //   this.errPass.set('');
    // }
  }

  manejoDeErrorServer(error:any) {
    if (error) {
      if (error.status === 400) {
        this.errEmail.set('Email incorrecto');
      } else if (error.status === 401) {
        this.errPass.set('Contraseña incorrecta');
      } else {
        console.error('Error inesperado:', error);
      }
      console.log(this.errEmail);
      this.updateErr()
      this.cdr.detectChanges();
    }
  }
}
