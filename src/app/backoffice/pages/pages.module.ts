import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';


// paginas
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';


// componentes
import { PagesComponent } from './pages.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsuariosComponent,
    PerfilUsuarioComponent,
    ClientesComponent,
    ProveedoresComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    RadioButtonModule,
    PasswordModule
  ],
  providers: [ConfirmationService],
})
export class PagesModule { }
