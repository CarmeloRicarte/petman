import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/models/backoffice/usuario.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario = new Usuario('', '', '');
  token: string | null = '';

  constructor(public http: HttpClient, public router: Router,) {
    this.cargarStorage();
  }


  /**
   * Funcion que guarda datos del usuario en el localStorage
   * @param id id del usuario
   * @param token token que se recibe del backend
   * @param usuario objeto con los datos del usuario
   */
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('idUsuario', id);
    localStorage.setItem('tokenUsuario', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  /**
    * Funcion que carga los datos del usuario y el token del localStorage
    */
  cargarStorage() {
    if (localStorage.getItem('tokenUsuario') && localStorage.getItem('usuario')) {
      this.token = localStorage.getItem('tokenUsuario');
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}') as Usuario;
    } else {
      this.token = '';
      this.usuario = new Usuario('', '', '');
    }
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get uid(): string | undefined {
    return this.usuario.uid;
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined {
    return this.usuario.role;
  }

  logout() {
    this.usuario = new Usuario('', '', '');
    this.token = '';
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tokenUsuario');
    this.router.navigate(['/login']);
  }

  /**
   * Funcion para hacer login
   * @param usuario objeto con datos del usuario
   */
  login(usuario: Usuario) {
    const url = `${environment.urlServicios}/login`;
    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.usuario.uid, res.token, res.usuario);
          return res;
        }, (err: any) => err)
      )
  }

  /**
    * Funcion para renovar el token del usuario
    */
  renovarToken(): Observable<boolean> {
    return this.http.get(`${environment.urlServicios}/login/renew`, this.headers)
      .pipe(
        map((resp: any) => {
          // desestructuramos el usuario
          const { role, nombre, nick, img, uid } = resp.usuario;
          // creamos instancia del usuario
          this.usuario = new Usuario(nombre, nick, '', img, role, uid);
          localStorage.setItem('tokenUsuario', resp.token);
          return true;
        }),
        catchError(error => of(false))
      );
  }

}
