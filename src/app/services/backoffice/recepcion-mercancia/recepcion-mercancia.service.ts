import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RecepcionMercancia } from '../../../models/backoffice/recepcionMercancia.model';

@Injectable({
  providedIn: 'root',
})
export class RecepcionMercanciaService {
  token = localStorage.getItem('tokenUsuario');

  constructor(public http: HttpClient) {}

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  crearRecepcion(recepcion: RecepcionMercancia) {
    const url = `${environment.urlServicios}/recepciones`;
    return this.http.post(url, recepcion, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  actualizarRecepcion(recepcion: RecepcionMercancia) {
    const url = `${environment.urlServicios}/recepciones/${recepcion.uid}?token=${this.token}`;
    return this.http.put(url, recepcion, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Funcion para obtener las recepciones de mercancia
   */
  obtenerRecepciones() {
    const url = `${environment.urlServicios}/recepciones`;
    return this.http.get(url, this.headers);
  }

  obtenerRecepcion(recepcion: any) {
    const url = `${environment.urlServicios}/recepciones/${recepcion}`;
    return this.http.get(url, this.headers);
  }

  eliminarRecepcion(recepcion: any) {
    const url = `${environment.urlServicios}/recepciones/${recepcion.uid}`;
    return this.http.delete(url, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }

  /**
   * Metodo para eliminar varias recepciones de mercancia
   * @param recepciones array de recepciones de mercancia a eliminar
   */
  eliminarRecepciones(recepciones: any[]) {
    const url = `${environment.urlServicios}/recepciones/deleteSelected`;
    return this.http.post(url, recepciones, this.headers).pipe(
      map(
        (resp: any) => resp,
        (err: any) => err
      )
    );
  }
}
