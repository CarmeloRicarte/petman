import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// paginas
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

// componentes
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsuariosComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    CommonModule
  ],
  providers: [],
})
export class PagesModule { }
