import { Component,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  nombre: string = 'Nombre';
  sessionData: any = {}
  constructor(private auth: AuthService){
      
  }
  


  ngOnInit():void {
    this.sessionData = this.auth.getSessionData();
    this.nombre = this.sessionData.name;
  }
  
}
