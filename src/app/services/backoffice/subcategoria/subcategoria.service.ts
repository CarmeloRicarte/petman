import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subcategoria } from 'src/app/models/backoffice/subcategoria.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubsubcategoriaService {
  token = localStorage.getItem('tokenUsuario');

  constructor(public http: HttpClient) {}

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  /**
   * Funcion para crear una subcategoria
   * @param subcategoria datos obligatorios de la subcategoria
   */
  crearSubcategoria(subcategoria: Subcategoria) {
    const url = `${environment.urlServicios}/subcategorias`;
    return this.http.post(url, subcategoria, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Función para actualizar datos de una subcategoria
   * @param subcategoria objeto con datos de la subcategoria
   */
  actualizarSubcategoria(subcategoria: Subcategoria) {
    const url = `${environment.urlServicios}/subcategorias/${subcategoria.uid}?token=${this.token}`;
    return this.http.put(url, subcategoria, this.headers).pipe(
      map(
        (resp: any) => {
          return resp;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }

  /**
   * Funcion para obtener las subcategorias
   */
  obtenerSubcategorias() {
    const url = `${environment.urlServicios}/subcategorias`;
    return this.http.get(url, this.headers);
  }

  obtenerSubcategoria(subcategoria: Subcategoria) {
    const url = `${environment.urlServicios}/subcategorias/${subcategoria.uid}`;
    return this.http.get(url, this.headers);
  }

  /**
   * Funcion para eliminar una subcategoria
   * @param subcategoria subcategoria a eliminar
   */
  eliminarSubcategoria(subcategoria: Subcategoria) {
    const url = `${environment.urlServicios}/subcategorias/${subcategoria.uid}`;
    return this.http.delete(url, this.headers).pipe(
      map(
        (resp: any) => {
          return resp;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }

  /**
   * Metodo para eliminar varias subcategorias
   * @param subcategorias array de subcategorias a eliminar
   */
  eliminarSubcategorias(subcategorias: any[]) {
    const url = `${environment.urlServicios}/subcategorias/deleteSelected`;
    return this.http.post(url, subcategorias, this.headers).pipe(
      map(
        (resp: any) => {
          return resp;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }
}
