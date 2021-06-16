import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnvioMercancia } from '../../../models/backoffice/envioMercancia.model';

@Injectable({
  providedIn: 'root',
})
export class EnvioMercanciaService {
  token = localStorage.getItem('tokenUsuario');

  constructor(public http: HttpClient) {}

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  crearEnvio(envio: EnvioMercancia) {
    const url = `${environment.urlServicios}/envios`;
    return this.http.post(url, envio, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  actualizarEnvio(envio: EnvioMercancia) {
    const url = `${environment.urlServicios}/envios/${envio.uid}?token=${this.token}`;
    return this.http.put(url, envio, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Funcion para obtener los envios de mercancia
   */
  obtenerEnvios() {
    const url = `${environment.urlServicios}/envios`;
    return this.http.get(url, this.headers);
  }

  obtenerEnvio(envio: any) {
    const url = `${environment.urlServicios}/envios/${envio}`;
    return this.http.get(url, this.headers);
  }

  obtenerProductosMasVendidos() {
    const url = `${environment.urlServicios}/envios/masVendidosEnvios`;
    return this.http.get(url, this.headers);
  }

  obtenerProductosMenosVendidos() {
    const url = `${environment.urlServicios}/envios/menosVendidosEnvios`;
    return this.http.get(url, this.headers);
  }

  eliminarEnvio(envio: any) {
    const url = `${environment.urlServicios}/envios/${envio.uid}`;
    return this.http.delete(url, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Metodo para eliminar varios envios de mercancia
   * @param envios array de envios de mercancia a eliminar
   */
  eliminarEnvios(envios: any[]) {
    const url = `${environment.urlServicios}/envios/deleteSelected`;
    return this.http.post(url, envios, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }
}
