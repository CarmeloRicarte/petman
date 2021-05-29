import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RecepcionMercancia } from '../../../../models/backoffice/recepcionMercancia.model';
import {
  UsuarioService,
  RecepcionMercanciaService,
} from 'src/app/services/service.index';

@Component({
  selector: 'app-recepcion-mercancia',
  templateUrl: './recepcion-mercancia.component.html',
  styleUrls: ['./recepcion-mercancia.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-recepciones.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-recepciones
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class RecepcionMercanciaComponent implements OnInit {
  recepciones: RecepcionMercancia[] = [];
  recepcionesSeleccionadas: any[] = [];
  totalRecepciones = 0;
  columnas: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    private recepcionService: RecepcionMercanciaService
  ) {}

  ngOnInit(): void {
    this.cargarRecepciones();
    this.columnas = [
      { field: 'numPedido', header: 'Núm.Pedido' },
      { field: 'fechaRecepcion', header: 'Fecha Recepción' },
    ];
  }

  cargarRecepciones() {
    this.recepcionService.obtenerRecepciones().subscribe(
      (res: any) => {
        this.recepciones = res.recepciones;
        this.totalRecepciones = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  crearRecepcion(): void {
    this.router.navigate(['/admin/gestionar-recepcion']);
  }

  editarRecepcion(recepcion: RecepcionMercancia): void {
    this.router.navigate([`/admin/gestionar-recepcion/${recepcion.uid}`]);
  }

  eliminarRecepcion(recepcion: RecepcionMercancia): void {
    Swal.fire({
      title: '¿Borrar recepción de mercancía?',
      text: `Está a punto de la recepción de mercancía ${recepcion.numPedido}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!',
    }).then((result: any) => {
      if (result.value) {
        this.recepcionService.eliminarRecepcion(recepcion).subscribe(
          () => {
            Swal.fire(
              'Eliminada!',
              `La recepción de mercancía con núm.pedido ${recepcion.numPedido} fue eliminada correctamente`,
              'success'
            );
            this.cargarRecepciones();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarRecepcionesSeleccionadas(): void {
    Swal.fire({
      title: '¿Borrar recepciones de mercancía?',
      text: `Está a punto de borrar ${this.recepcionesSeleccionadas.length} recepciones de mercancía, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlas!',
    }).then((result: any) => {
      if (result.value) {
        this.recepcionService
          .eliminarRecepciones(this.recepcionesSeleccionadas)
          .subscribe(
            (res: any) => {
              Swal.fire('Eliminadas!', `${res.msg}`, 'success');
              this.cargarRecepciones();
            },
            (err: any) => {
              console.error(err);
            }
          );
      }
    });
  }
}
