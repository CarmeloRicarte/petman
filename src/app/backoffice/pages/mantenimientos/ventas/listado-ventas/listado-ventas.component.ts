import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Venta } from '../../../../../models/backoffice/venta.model';
import { UsuarioService, TpvService } from 'src/app/services/service.index';
@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-ventas.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-ventas
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class ListadoVentasComponent implements OnInit, OnDestroy {
  ventas: Venta[] = [];
  ventasSeleccionadas: any[] = [];
  totalVentas = 0;
  columnas: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    private tpvService: TpvService
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.columnas = [
      { field: 'fechaVenta', header: 'Fecha Venta' },
      { field: 'importeTotal', header: 'Importe Total' },
      { field: 'formaPago', header: 'Forma Pago' },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarVentas() {
    this.tpvService.obtenerVentas().subscribe(
      (res: any) => {
        this.ventas = res.ventas;
        this.totalVentas = res.total;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  visualizarVenta(venta: Venta): void {
    this.router.navigate([`/admin/tpv/venta/${venta.uid}`]);
  }

  eliminarVenta(venta: Venta): void {
    Swal.fire({
      title: '¿Borrar venta?',
      text: `Está a punto de borrar la venta`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!',
    }).then((result: any) => {
      if (result.value) {
        this.tpvService.eliminarVenta(venta).subscribe(
          () => {
            Swal.fire(
              'Eliminada!',
              `La venta fue eliminada correctamente`,
              'success'
            );
            this.cargarVentas();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarVentasSeleccionadas(): void {
    Swal.fire({
      title: '¿Borrar ventas?',
      text: `Está a punto de borrar ${this.ventasSeleccionadas.length} ventas, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlas!',
    }).then((result: any) => {
      if (result.value) {
        this.tpvService.eliminarVentas(this.ventasSeleccionadas).subscribe(
          (res: any) => {
            Swal.fire('Eliminadas!', `${res.msg}`, 'success');
            this.cargarVentas();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  crearVenta(): void {
    this.router.navigate(['admin/tpv/crear']);
  }
}
