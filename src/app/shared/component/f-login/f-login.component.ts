import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f-login',
  templateUrl: './f-login.component.html',
  styleUrls: ['./f-login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule,HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLoginComponent {
  form: FormGroup;
  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  constructor( 
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onUpload(): void {
    console.log(this.form.valid);
    
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('email', this.form.get('email')?.value);
      formData.append('password', this.form.get('password')?.value);

      
      if(this.auth.login(formData) === true){
        this.router.navigate(['/dashboard']);
      }
      // .subscribe(
      //   response => {
      //     console.log("Logeado!!!");
      //   },
      //   error=>{
      //     console.error(error);
      //   }
      // );
    }
  }

}
