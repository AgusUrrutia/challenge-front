import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent, RouterModule, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
