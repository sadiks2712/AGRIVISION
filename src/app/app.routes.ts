import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ComplaintComponent } from './complaint/complaint';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'complaint',
    component: ComplaintComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
