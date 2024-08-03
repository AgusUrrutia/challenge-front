import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-crear-tabla',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule,],
  templateUrl: './modal-crear-tabla.component.html',
  styleUrl: './modal-crear-tabla.component.css'
})
export class ModalCrearTablaComponent {
  constructor(public dialogRef: DialogRef){
    
  }
}
