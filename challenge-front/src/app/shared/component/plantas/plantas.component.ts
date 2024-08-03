import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { Planta } from '../../../interfaces/planta';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalCrearTablaComponent } from '../modal-crear-tabla/modal-crear-tabla.component';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule,DialogModule],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent {
  plantas :Array<Planta> = [
    {
      id: 1,
      pais: 'argentina',
      nombre_de_planta: 'Planta 1',
      lecturas: 2,
      alertas_medias: 2,
      alertas_rojas: 5
    }
  ]

  constructor(public dialog: Dialog) {}
  crearPlanta(){
    this.dialog.open(ModalCrearTablaComponent);
  }
  editar(planta : Planta){
    this.dialog.open(ModalComponent, {
      data:{
        id: planta.id,
        pais: planta.pais,
        nombre_de_planta : planta.nombre_de_planta,
        lecturas: planta.lecturas,
        alertas_medias: planta.alertas_medias,
        alertas_rojas: planta.alertas_rojas
      }
    });
    
  }


}
