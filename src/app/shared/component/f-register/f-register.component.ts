import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { merge } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f-register',
  templateUrl: './f-register.component.html',
  styleUrl: './f-register.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FRegisterComponent {
  form: FormGroup;
  hide = signal(true);
  error: any = null;
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  readonly name = new FormControl('', [Validators.required,Validators.nullValidator]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required,Validators.nullValidator]);
  readonly reppassword = new FormControl('', [Validators.required, Validators.nullValidator,(control: AbstractControl) => {
    return control.value === this.password.value ? null : { passwordMismatch: true };
  }]);
  errName = signal('');
  errEmail = signal('');
  errPass = signal('');
  errRepPass = signal('');

  constructor( 
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){
    merge(
      this.name.statusChanges, 
      this.name.valueChanges,
      this.email.statusChanges, 
      this.email.valueChanges, 
      this.password.statusChanges, 
      this.password.valueChanges, 
      this.reppassword.statusChanges, 
      this.reppassword.valueChanges
      )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErr());
    
    this.form = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      reppassword: this.reppassword
    });
  }
  onUpload(): void {
    console.log(this.form.valid);
    
    if (this.form.valid) {
      const formData = new FormData();
      console.log('Name:', this.form.get('name')?.value);
      console.log('Email:', this.form.get('email')?.value);
      console.log('Password:', this.form.get('password')?.value);
    
      formData.append('name', this.form.get('name')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('password', this.form.get('password')?.value);
      
      this.auth.register(formData).subscribe(
        response => {
          console.log("Logeado!!!");
          this.router.navigate(['/dashboard']);
        },
        error=>{
          this.error = error.error.message;
          this.manejoDeErrorServer(error);
        }
      );
    }
  }

  updateErr() {
    if (this.name.hasError('required')) {
      this.errName.set('Ingresa un name valido');
    } else if (this.name.hasError('name')) {
      this.errName.set('Falta la dirección de correo ej: @example.com');
    } else {
      this.errName.set('');
    }

    if (this.email.hasError('required')) {
      this.errEmail.set('Ingresa un email valido');
      
    } else if (this.email.hasError('email')) {
      this.errEmail.set('Falta la dirección de correo ej: @example.com');
    } else {
      this.errEmail.set('');
    }

    if (this.password.hasError('required')) {
      this.errPass.set('Ingresa una contraseña');
    } else if (this.password.hasError('password')) {
      this.errPass.set('Contraseña incorrecta');
    } else {
      this.errPass.set('');
    }
    
    if (this.reppassword.hasError('required')) {
      this.errRepPass.set('Repita contraseña');
    } else if (this.reppassword.hasError('reppassword') || this.reppassword.value) {
      this.errRepPass.set('Las contraseña no son iguales')
    } else {
      this.errRepPass.set('');
    }
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
      this.updateErr()
      this.cdr.detectChanges();
    }
  }

}

