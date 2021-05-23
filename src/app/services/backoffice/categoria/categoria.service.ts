import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/models/backoffice/categoria.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
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
   * Funcion para crear una categoria
   * @param categoria datos obligatorios de la categoria
   */
  crearCategoria(categoria: Categoria) {
    const url = `${environment.urlServicios}/categorias`;
    return this.http.post(url, categoria, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Función para actualizar datos de una categoria
   * @param categoria objeto con datos de la categoria
   */
  actualizarCategoria(categoria: Categoria) {
    const url = `${environment.urlServicios}/categorias/${categoria.uid}?token=${this.token}`;
    return this.http.put(url, categoria, this.headers).pipe(
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
   * Funcion para obtener las categorias
   */
  obtenerCategorias() {
    const url = `${environment.urlServicios}/categorias`;
    return this.http.get(url, this.headers);
  }

  obtenerCategoria(categoria: Categoria) {
    const url = `${environment.urlServicios}/categorias/${categoria.uid}`;
    return this.http.get(url, this.headers);
  }

  /**
   * Funcion para eliminar una categoria
   * @param categoria categoria a eliminar
   */
  eliminarCategoria(categoria: Categoria) {
    const url = `${environment.urlServicios}/categorias/${categoria.uid}`;
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
   * Metodo para eliminar varias categorias
   * @param categorias array de categorias a eliminar
   */
  eliminarCategorias(categorias: any[]) {
    const url = `${environment.urlServicios}/categorias/deleteSelected`;
    return this.http.post(url, categorias, this.headers).pipe(
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
