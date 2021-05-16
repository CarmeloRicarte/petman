import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../../../models/backoffice/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  token = localStorage.getItem('tokenUsuario');

  constructor(public http: HttpClient, private toastr: ToastrService) { }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /**
   * Funcion para crear un proveedor
   * @param proveedor datos obligatorios del proveedor
   */
  crearProveedor(proveedor: Proveedor) {
    const url = `${environment.urlServicios}/proveedores`;
    return this.http.post(url, proveedor, this.headers)
      .pipe(
        map((resp: any) => {
          this.toastr.success(`Proveedor ${resp.proveedor.nombre} creado!`);
        }, (err: any) => {
          this.toastr.error(`Error al crear el proveedor: ${err.error.msg}`);
        })
      );
  }

  /**
   * Función para actualizar datos de un proveedor
   * @param proveedor objeto con datos del proveedor
   */
  actualizarProveedor(proveedor: Proveedor) {
    const url = `${environment.urlServicios}/proveedores/${proveedor.uid}?token=${this.token}`;
    return this.http.put(url, proveedor, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }, (err: any) => {
          return err;
        })
      );
  }

  /**
    * Funcion para obtener los proveedores
    */
  obtenerProveedores() {
    const url = `${environment.urlServicios}/proveedores`;
    return this.http.get(url, this.headers);
  }

  obtenerProveedor(proveedor: Proveedor) {
    const url = `${environment.urlServicios}/proveedores/${proveedor.uid}`;
    return this.http.get(url, this.headers);
  }

  /**
   * Funcion para eliminar un proveedor
   * @param proveedor proveedor a eliminar
   */
  eliminarProveedor(proveedor: Proveedor) {
    const url = `${environment.urlServicios}/proveedores/${proveedor.uid}`;
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
   * Metodo para eliminar varios proveedores
   * @param proveedores array de proveedores a eliminar
   */
  eliminarProveedores(proveedores: any[]) {
    const url = `${environment.urlServicios}/proveedores/deleteSelected`;
    return this.http.post(url, proveedores, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }, (err: any) => {
          return err;
        })
      );
  }
}
