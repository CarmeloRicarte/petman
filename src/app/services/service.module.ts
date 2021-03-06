import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioService, LoginGuard } from './service.index';
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [UsuarioService, LoginGuard],
})
export class ServiceModule {}
