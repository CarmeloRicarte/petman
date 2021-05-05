import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/backoffice/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario = new Usuario('', '', '');
  token: string = '';
  menu: Array<any> = [];

  constructor(public http: HttpClient, private toastr: ToastrService, public router: Router) {
    this.cargarStorage();
  }

  /**
    * Funcion para crear un usuario
    * @param usuario datos obligatorios del registro
    */
  crearUsuario(usuario: Usuario) {
    const url = `${environment.urlServicios}/usuarios`;
    return this.http.post(url, usuario, this.headers)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.usuario.uid, resp.token, resp.usuario);
          this.toastr.success(`Usuario ${resp.usuario.nick} creado!`);
        }, (err: any) => {
          this.toastr.error(`Error al crear el usuario: ${err.error.msg}`);
        })
      );
  }

  /**
   * Función para actualizar datos de usuario en su perfil
   * @param usuario objeto con datos del usuario
   */
  actualizarUsuario(usuario: Usuario) {
    const url = `${environment.urlServicios}/usuarios/${usuario.uid}?token=${this.token}`;
    return this.http.put(url, usuario, this.headers)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.usuario.uid, this.token, resp.usuario);
          return resp;
        }, (err: any) => {
          return err;
        })
      );
  }

  /**
   * Función para guardar un usuario
   * @param usuario objeto con datos del usuario
   */
  guardarUsuario(usuario: Usuario) {
    const url = `${environment.urlServicios}/usuarios/${usuario.uid}?token=${this.token}`;
    return this.http.put(url, usuario, this.headers)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.usuario.uid, this.token, resp.usuario, resp.menu);
          return resp;
        }, (err: any) => {
          return err;
        })
      );
  }

  /**
    * Funcion para obtener los usuarios
    */
  obtenerUsuarios(desde: number = 0) {
    const url = `${environment.urlServicios}/usuarios?desde=${desde}`;
    return this.http.get(url, this.headers);
  }

  /**
   * Funcion para eliminar un usuario
   * @param usuario usuario a eliminar
   */
  eliminarUsuario(usuario: Usuario) {
    const url = `${environment.urlServicios}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }, (err: any) => {
          return err;
        })
      );

  }

  /**
   * Funcion que guarda datos del usuario en el localStorage
   * @param id id del usuario
   * @param token token que se recibe del backend
   * @param usuario objeto con los datos del usuario
   * @param menu array de objetos con el menu a mostrar en el sidebar
   */
  guardarStorage(id: string, token: string, usuario: Usuario, menu?: any) {
    localStorage.setItem('idUsuario', id);
    localStorage.setItem('tokenUsuario', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));


    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  /**
    * Funcion que carga los datos del usuario y el token del localStorage
    */
  cargarStorage() {
    if (localStorage.getItem('tokenUsuario') && localStorage.getItem('usuario')) {
      this.token = localStorage.getItem('tokenUsuario') || '';
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}') as Usuario;
      this.menu = JSON.parse(localStorage.getItem('menu') || '[]');
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
    this.menu = [];
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tokenUsuario');
    localStorage.removeItem('menu');
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
          this.guardarStorage(res.usuario.uid, res.token, res.usuario, res.menu);
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
          localStorage.setItem('menu', resp.menu);
          return true;
        }),
        catchError(error => of(false))
      );
  }
}