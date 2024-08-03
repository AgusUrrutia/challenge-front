import { Component } from '@angular/core';
import { MedidoresComponent } from "../medidores/medidores.component";

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [MedidoresComponent],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css'
})
export class IndicadoresComponent {
  
}
