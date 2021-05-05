import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/backoffice/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(public usuarioService: UsuarioService, public router: Router) {

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.usuarioService.renovarToken()) {
      console.log('Pasó por el loginGuard');
      return true;
    } else {
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate() {
    if (this.usuarioService.renovarToken()) {
      console.log('Pasó por el loginGuard');
      return true;
    } else {
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
