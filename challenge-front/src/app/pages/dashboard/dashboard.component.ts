import { Component } from '@angular/core';
import { LecturasComponent } from "../../shared/component/lecturas/lecturas.component";
import { PlantasComponent } from "../../shared/component/plantas/plantas.component";
import { IndicadoresComponent } from "../../shared/component/indicadores/indicadores.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LecturasComponent, PlantasComponent, IndicadoresComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
