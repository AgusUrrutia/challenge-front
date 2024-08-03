import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './shared/component/login-register/login-register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginRegisterComponent },
    { path: 'register', component: LoginRegisterComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
        //   { path: 'seguir la lista', component: AboutComponent },
          { path: '**', redirectTo: '/dashboard'}
        ]
      },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
