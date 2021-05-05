import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';


import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsuariosComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class PagesModule { }
