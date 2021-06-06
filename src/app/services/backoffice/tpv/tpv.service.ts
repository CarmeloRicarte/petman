import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Venta } from '../../../models/backoffice/venta.model';

@Injectable({
  providedIn: 'root',
})
export class TpvService {
  token = localStorage.getItem('tokenUsuario');

  constructor(public http: HttpClient) {}

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  crearVenta(venta: Venta) {
    const url = `${environment.urlServicios}/tpv`;
    return this.http.post(url, venta, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  obtenerVentas() {
    const url = `${environment.urlServicios}/tpv`;
    return this.http.get(url, this.headers);
  }

  obtenerVenta(venta: any) {
    const url = `${environment.urlServicios}/tpv/${venta.uid}`;
    return this.http.get(url, this.headers);
  }

  eliminarVenta(venta: any) {
    const url = `${environment.urlServicios}/tpv/${venta.uid}`;
    return this.http.delete(url, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Metodo para eliminar varias ventas
   * @param ventas array de ventas a eliminar
   */
  eliminarVentas(ventas: any[]) {
    const url = `${environment.urlServicios}/tpv/deleteSelected`;
    return this.http.post(url, ventas, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }
}
