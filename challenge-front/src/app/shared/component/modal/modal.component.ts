import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Planta } from '../../../interfaces/planta';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule,],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  planta: Planta;
  form: FormGroup;
  constructor(public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: Planta,
  private fb: FormBuilder) {
    this.planta = data;
    this.form = this.fb.group({
      pais: [this.planta.pais],
      nombre_de_planta: [this.planta.nombre_de_planta],
      lecturas: [this.planta.lecturas],
      alertas_medias: [this.planta.alertas_medias],
      alertas_rojas: [this.planta.alertas_rojas]
    });

  }
  onUpload(): void {
    console.log(this.form.valid);
    
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('pais', this.form.get('pais')?.value);
      formData.append('nombre_de_planta', this.form.get('nombre_de_planta')?.value);
      formData.append('lecturas', this.form.get('lecturas')?.value);
      formData.append('alertas_medias', this.form.get('alertas_medias')?.value);
      formData.append('alerta_rojas', this.form.get('alerta_rojas')?.value);

      
      // if(this.auth.login(formData) === true){
      //   this.router.navigate(['/dashboard']);
      // }
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
