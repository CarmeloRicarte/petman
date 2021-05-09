import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/backoffice/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {

  }
  canActivate() {
    if (!!this.usuarioService.token && !!this.usuarioService.usuario.uid) {
      console.log('Pasó por el loginGuard');
      this.usuarioService.renovarToken();
      return true;
    } else {
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
