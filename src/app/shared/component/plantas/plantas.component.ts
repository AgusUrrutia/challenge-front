import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { Planta } from '../../../interfaces/planta';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalCrearTablaComponent } from '../modal-crear-tabla/modal-crear-tabla.component';
import { PlantasDataService } from '../../../core/services/plantas-data.service';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule,DialogModule],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent implements OnInit {
  plantas: Array<Planta> = [];
  paises: Array<any> = [];
  constructor(public dialog: Dialog, private plantaService: PlantasDataService) {}
  
  abrirModalCrearPlanta(){
    this.dialog.open(ModalCrearTablaComponent);
  }
  abrirModalEditarPlanta(planta : Planta){
    this.dialog.open(ModalComponent,{
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
  getAllPlantas(){
    this.plantaService.getAll().subscribe((response: Planta[]) => {
      this.plantas = response;
    });
  }
  getPais() {
    this.plantaService.getAll().subscribe((plantas) => {
      this.plantas = plantas; // O la asignación que necesites
  
      // Extrae los nombres de los países de las plantas
      const paises = [...new Set(this.plantas.map(planta => planta.pais))];
  
      // Llama a la API para cada país
      paises.forEach(pais => {
        this.plantaService.getCountrie(pais).subscribe((data) => {
          const flag = data[0]?.flags?.svg || 'default_flag_url'; // Asume que la API devuelve un array
  
          // Actualiza las plantas con la bandera correspondiente
          this.plantas = this.plantas.map(planta => ({
            ...planta,
            flag: planta.pais === pais ? flag : planta.flag
          }));
  
          console.log(this.plantas);
        });
      });
    });
  }
  ngOnInit(): void {
    this.getAllPlantas();
    this.getPais();
  }

}
