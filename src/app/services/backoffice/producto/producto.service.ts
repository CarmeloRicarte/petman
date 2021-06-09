import { Producto } from '../../../models/backoffice/producto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
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
   * Funcion para crear un producto
   * @param producto datos obligatorios del producto
   */
  crearProducto(producto: Producto) {
    const url = `${environment.urlServicios}/productos`;
    return this.http.post(url, producto, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Función para actualizar datos de un producto
   * @param producto objeto con datos del producto
   */
  actualizarProducto(producto: Producto) {
    const url = `${environment.urlServicios}/productos/${producto.uid}?token=${this.token}`;
    return this.http.put(url, producto, this.headers).pipe(
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

  actualizarCantidadProducto(
    producto: any,
    desde: 'envios' | 'recepciones' | 'ventas'
  ) {
    const url = `${environment.urlServicios}/productos/${producto.uid}/${desde}/updateCantidad?token=${this.token}`;
    return this.http.put(url, producto, this.headers).pipe(
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

  actualizarPrecioProducto(producto: any) {
    const url = `${environment.urlServicios}/productos/${producto.uid}/updatePrecio?token=${this.token}`;
    return this.http.put(url, producto, this.headers).pipe(
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
   * Funcion para obtener los productos
   */
  obtenerProductos() {
    const url = `${environment.urlServicios}/productos`;
    return this.http.get(url, this.headers);
  }

  obtenerProductosConStock() {
    const url = `${environment.urlServicios}/productos/conStock`;
    return this.http.get(url, this.headers);
  }

  obtenerProducto(producto: Producto) {
    const url = `${environment.urlServicios}/productos/${producto.uid}`;
    return this.http.get(url, this.headers);
  }

  /**
   * Funcion para eliminar un producto
   * @param producto producto a eliminar
   */
  eliminarProducto(producto: Producto) {
    const url = `${environment.urlServicios}/productos/${producto.uid}`;
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
   * Metodo para eliminar varios productos
   * @param productos array de productos a eliminar
   */
  eliminarProductos(productos: any[]) {
    const url = `${environment.urlServicios}/productos/deleteSelected`;
    return this.http.post(url, productos, this.headers).pipe(
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
