import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../../../models/backoffice/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  token = localStorage.getItem('tokenUsuario');

  constructor(public http: HttpClient, private toastr: ToastrService) {}

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  /**
   * Funcion para crear un cliente
   * @param cliente datos obligatorios del cliente
   */
  crearCliente(cliente: Cliente) {
    const url = `${environment.urlServicios}/clientes`;
    return this.http.post(url, cliente, this.headers).pipe(
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
   * Función para actualizar datos de un cliente
   * @param cliente objeto con datos del cliente
   */
  actualizarCliente(cliente: Cliente) {
    const url = `${environment.urlServicios}/clientes/${cliente.uid}?token=${this.token}`;
    return this.http.put(url, cliente, this.headers).pipe(
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
   * Funcion para obtener los clientes
   */
  obtenerClientes() {
    const url = `${environment.urlServicios}/clientes`;
    return this.http.get(url, this.headers);
  }

  obtenerCliente(cliente: Cliente) {
    const url = `${environment.urlServicios}/clientes/${cliente.uid}`;
    return this.http.get(url, this.headers);
  }

  /**
   * Funcion para eliminar un cliente
   * @param cliente cliente a eliminar
   */
  eliminarCliente(cliente: Cliente) {
    const url = `${environment.urlServicios}/clientes/${cliente.uid}`;
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
   * Metodo para eliminar varios clientes
   * @param clientes array de clientes a eliminar
   */
  eliminarClientes(clientes: any[]) {
    const url = `${environment.urlServicios}/clientes/deleteSelected`;
    return this.http.post(url, clientes, this.headers).pipe(
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
