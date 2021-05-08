import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AdminGuard } from '../../guards/admin.guard';


const childRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  // Mantenimientos

  // Inicio Rutas de administrador
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
  // Fin Rutas de administrador
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
