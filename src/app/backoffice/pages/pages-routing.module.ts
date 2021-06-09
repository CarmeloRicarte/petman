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
import { EnvioMercanciaComponent } from './mantenimientos/envio-mercancia/envio-mercancia.component';
import { RecepcionMercanciaComponent } from './mantenimientos/recepcion-mercancia/recepcion-mercancia.component';
import { GestionarEnvioMercanciaComponent } from './mantenimientos/gestionar-envio-mercancia/gestionar-envio-mercancia.component';
import { GestionarRecepcionMercanciaComponent } from './mantenimientos/gestionar-recepcion-mercancia/gestionar-recepcion-mercancia.component';
import { CrearVentaComponent } from './mantenimientos/ventas/crear-venta/crear-venta.component';
import { ListadoVentasComponent } from './mantenimientos/ventas/listado-ventas/listado-ventas.component';

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
      {
        path: 'envio-mercancia',
        component: EnvioMercanciaComponent,
        data: { titulo: 'Envíos de Mercancía' },
      },
      {
        path: 'recepcion-mercancia',
        component: RecepcionMercanciaComponent,
        data: { titulo: 'Recepciones de Mercancía' },
      },
      { path: 'gestionar-envio', component: GestionarEnvioMercanciaComponent },
      {
        path: 'gestionar-envio/:uid',
        component: GestionarEnvioMercanciaComponent,
      },
      {
        path: 'gestionar-recepcion',
        component: GestionarRecepcionMercanciaComponent,
      },
      {
        path: 'gestionar-recepcion/:uid',
        component: GestionarRecepcionMercanciaComponent,
      },
      {
        path: 'tpv/crear',
        component: CrearVentaComponent,
      },
      {
        path: 'tpv/venta/:uid',
        component: CrearVentaComponent,
      },
      {
        path: 'tpv/listado-ventas',
        component: ListadoVentasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
