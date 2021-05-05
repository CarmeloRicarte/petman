import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';

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
  ],
  providers: [],
})
export class PagesModule { }
