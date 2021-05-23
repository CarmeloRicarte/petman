import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../../guards/login.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { SubcategoriasComponent } from './mantenimientos/subcategorias/subcategorias.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'perfil-usuario',
        component: PerfilUsuarioComponent,
        data: { titulo: 'Perfil de Usuario' },
      },
      // Inicio Rutas de administrador
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios' },
      },
      // Fin Rutas de administrador
      {
        path: 'clientes',
        component: ClientesComponent,
        data: { titulo: 'Clientes' },
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        data: { titulo: 'Proveedores' },
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
        data: { titulo: 'Categorías' },
      },
      {
        path: 'subcategorias',
        component: SubcategoriasComponent,
        data: { titulo: 'Subcategorías' },
      },
      {
        path: 'productos',
        component: ProductosComponent,
        data: { titulo: 'Productos' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
