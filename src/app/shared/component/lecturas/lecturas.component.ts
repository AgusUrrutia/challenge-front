import { Component, OnInit } from '@angular/core';
import { PlantasDataService } from '../../../core/services/plantas-data.service';
import { Planta } from '../../../interfaces/planta';

@Component({
  selector: 'app-lecturas',
  standalone: true,
  imports: [],
  templateUrl: './lecturas.component.html',
  styleUrl: './lecturas.component.css'
})
export class LecturasComponent implements OnInit  {
  plantas: Array<Planta> = [];
  lecturasOk:number = 0;
  alertas_medias: number = 0;
  alertas_rojas: number = 0;
  sensores_des: number = 0;

  constructor(private plantaService: PlantasDataService){

  }
  

  getAllPlantas(){
    this.plantaService.getAll().subscribe((response: Planta[]) => {
      response.forEach((planta) => {
        this.lecturasOk += planta.lecturas
        this.alertas_medias += planta.alertas_medias
        this.alertas_rojas += planta.alertas_rojas
      })

      
    });
  }
  ngOnInit(): void {
    this.getAllPlantas();
  }
}
