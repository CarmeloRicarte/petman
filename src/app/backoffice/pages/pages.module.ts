import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@angular/common/locales/global/es';
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
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

// paginas
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { SubcategoriasComponent } from './mantenimientos/subcategorias/subcategorias.component';
import { EnvioMercanciaComponent } from './mantenimientos/envio-mercancia/envio-mercancia.component';
import { RecepcionMercanciaComponent } from './mantenimientos/recepcion-mercancia/recepcion-mercancia.component';
import { GestionarRecepcionMercanciaComponent } from './mantenimientos/gestionar-recepcion-mercancia/gestionar-recepcion-mercancia.component';
import { GestionarEnvioMercanciaComponent } from './mantenimientos/gestionar-envio-mercancia/gestionar-envio-mercancia.component';

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
    ProveedoresComponent,
    ProductosComponent,
    CategoriasComponent,
    SubcategoriasComponent,
    EnvioMercanciaComponent,
    RecepcionMercanciaComponent,
    GestionarRecepcionMercanciaComponent,
    GestionarEnvioMercanciaComponent,
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
    PasswordModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    MultiSelectModule,
  ],
  providers: [ConfirmationService, { provide: LOCALE_ID, useValue: 'es' }],
})
export class PagesModule {}
