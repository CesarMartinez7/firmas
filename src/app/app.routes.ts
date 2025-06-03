import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.component').then((m) => m.HomeComponent),
  },{
    path: "login",
    loadComponent: () => import("./routes/login/login.component").then((m) => m.LoginComponent )
  }
];
