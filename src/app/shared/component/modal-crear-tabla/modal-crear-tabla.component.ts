import { DialogRef } from '@angular/cdk/dialog';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { PlantasDataService } from '../../../core/services/plantas-data.service';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal-crear-tabla',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './modal-crear-tabla.component.html',
  styleUrl: './modal-crear-tabla.component.css'
})
export class ModalCrearTablaComponent {
  form: FormGroup;
  readonly nombre_de_planta = new FormControl('', [Validators.required,Validators.nullValidator]);
  readonly pais = new FormControl('', [Validators.required, Validators.nullValidator]);
  errPlantaName = signal('');
  errPais = signal('');

  constructor(public dialogRef: DialogRef,private plantaService: PlantasDataService,private fb: FormBuilder){
    this.form = this.fb.group({
      nombre_de_planta: this.nombre_de_planta,
      pais: this.pais
    });

    merge(
      this.nombre_de_planta.statusChanges,
      this.nombre_de_planta.valueChanges,
      this.pais.statusChanges,
      this.pais.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErr());
  }

  onUpload(): void {
    
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('nombre_de_planta', this.form.get('nombre_de_planta')?.value);
      formData.append('pais', this.form.get('pais')?.value);

      this.plantaService.postPlanta(formData).subscribe(
        response => {
         
        },
        error => {  
          
        }
      );
    }
  }

  updateErr() {
    if (this.nombre_de_planta.hasError('required')) {
      this.errPlantaName.set('Ingresa un nombre_de_planta valido');
    }
   

    if (this.pais.hasError('required')) {
      this.errPais.set('Ingresa un pais');
    }
  }
}
