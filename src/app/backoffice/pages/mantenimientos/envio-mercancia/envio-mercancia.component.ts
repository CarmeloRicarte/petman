import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EnvioMercancia } from '../../../../models/backoffice/envioMercancia.model';
import {
  UsuarioService,
  EnvioMercanciaService,
} from 'src/app/services/service.index';
@Component({
  selector: 'app-envio-mercancia',
  templateUrl: './envio-mercancia.component.html',
  styleUrls: ['./envio-mercancia.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-envios.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-envios
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class EnvioMercanciaComponent implements OnInit, OnDestroy {
  envios: EnvioMercancia[] = [];
  enviosSeleccionados: any[] = [];
  totalEnvios = 0;
  columnas: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    private envioService: EnvioMercanciaService
  ) {}

  ngOnInit(): void {
    this.cargarEnvios();
    this.columnas = [
      { field: 'numEnvio', header: 'Núm.Pedido' },
      { field: 'fechaEnvio', header: 'Fecha Envío' },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarEnvios() {
    this.envioService.obtenerEnvios().subscribe(
      (res: any) => {
        this.envios = res.envios;
        this.totalEnvios = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  crearEnvio(): void {
    this.router.navigate(['/admin/gestionar-envio']);
  }

  editarEnvio(envio: EnvioMercancia): void {
    this.router.navigate([`/admin/gestionar-envio/${envio.uid}`]);
  }

  eliminarEnvio(envio: EnvioMercancia): void {
    Swal.fire({
      title: '¿Borrar envío de mercancía?',
      text: `Está a punto de borrar el envío de mercancía ${envio.numEnvio}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result: any) => {
      if (result.value) {
        this.envioService.eliminarEnvio(envio).subscribe(
          () => {
            Swal.fire(
              'Eliminado!',
              `El envío de mercancía con núm.envío ${envio.numEnvio} fue eliminado correctamente`,
              'success'
            );
            this.cargarEnvios();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarEnviosSeleccionados(): void {
    Swal.fire({
      title: '¿Borrar envios de mercancía?',
      text: `Está a punto de borrar ${this.enviosSeleccionados.length} envios de mercancía, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlos!',
    }).then((result: any) => {
      if (result.value) {
        this.envioService.eliminarEnvios(this.enviosSeleccionados).subscribe(
          (res: any) => {
            Swal.fire('Eliminados!', `${res.msg}`, 'success');
            this.cargarEnvios();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }
}
