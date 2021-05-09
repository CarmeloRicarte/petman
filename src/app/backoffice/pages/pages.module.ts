import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
// paginas
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

// componentes
import { PagesComponent } from './pages.component';


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
    CommonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
})
export class PagesModule { }
