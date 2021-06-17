import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  TpvService,
  EnvioMercanciaService,
  RecepcionMercanciaService,
} from 'src/app/services/service.index';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnInit {
  productosMasVendidosTPV: any;
  productosMenosVendidosTPV: any;
  productosMasVendidosEnvios: any;
  productosMenosVendidosEnvios: any;
  productosMasComprados: any;
  productosMenosComprados: any;

  constructor(
    private tpvService: TpvService,
    private envioMercanciaService: EnvioMercanciaService,
    private recepcionMercanciaService: RecepcionMercanciaService
  ) {}

  ngOnInit(): void {
    this.getDataProductosMasVendidosTPV();
    this.getDataProductosMenosVendidosTPV();
    this.getDataProductosMasVendidosEnvios();
    this.getDataProductosMenosVendidosEnvios();
    this.getDataProductosMasComprados();
    this.getDataProductosMenosComprados();
  }

  getDataProductosMasVendidosTPV() {
    this.tpvService
      .obtenerProductosMasVendidos()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res.productosMasVendidos) {
            this.productosMasVendidosTPV = {
              labels: [
                res.productosMasVendidos[0].nombre,
                res.productosMasVendidos[1].nombre,
                res.productosMasVendidos[2].nombre,
              ],
              datasets: [
                {
                  data: [
                    res.productosMasVendidos[0].cantidad,
                    res.productosMasVendidos[1].cantidad,
                    res.productosMasVendidos[2].cantidad,
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            };
          }
        },
      });
  }

  getDataProductosMenosVendidosTPV() {
    this.tpvService
      .obtenerProductosMenosVendidos()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res.productosMenosVendidos) {
            this.productosMenosVendidosTPV = {
              labels: [
                res.productosMenosVendidos[0].nombre,
                res.productosMenosVendidos[1].nombre,
                res.productosMenosVendidos[2].nombre,
              ],
              datasets: [
                {
                  data: [
                    res.productosMenosVendidos[0].cantidad,
                    res.productosMenosVendidos[1].cantidad,
                    res.productosMenosVendidos[2].cantidad,
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            };
          }
        },
      });
  }

  getDataProductosMasVendidosEnvios() {
    this.envioMercanciaService
      .obtenerProductosMasVendidos()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res.productosMasVendidosEnvios) {
            this.productosMasVendidosEnvios = {
              labels: [
                res.productosMasVendidosEnvios[0].nombre,
                res.productosMasVendidosEnvios[1].nombre,
                res.productosMasVendidosEnvios[2].nombre,
              ],
              datasets: [
                {
                  data: [
                    res.productosMasVendidosEnvios[0].cantidad,
                    res.productosMasVendidosEnvios[1].cantidad,
                    res.productosMasVendidosEnvios[2].cantidad,
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            };
          }
        },
      });
  }
  getDataProductosMenosVendidosEnvios() {
    this.envioMercanciaService
      .obtenerProductosMenosVendidos()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res.productosMenosVendidosEnvios) {
            this.productosMenosVendidosEnvios = {
              labels: [
                res.productosMenosVendidosEnvios[0].nombre,
                res.productosMenosVendidosEnvios[1].nombre,
                res.productosMenosVendidosEnvios[2].nombre,
              ],
              datasets: [
                {
                  data: [
                    res.productosMenosVendidosEnvios[0].cantidad,
                    res.productosMenosVendidosEnvios[1].cantidad,
                    res.productosMenosVendidosEnvios[2].cantidad,
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            };
          }
        },
      });
  }
  getDataProductosMasComprados() {
    this.recepcionMercanciaService
      .obtenerProductosMasComprados()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res.productosMasComprados) {
            this.productosMasComprados = {
              labels: [
                res.productosMasComprados[0].nombre,
                res.productosMasComprados[1].nombre,
                res.productosMasComprados[2].nombre,
              ],
              datasets: [
                {
                  data: [
                    res.productosMasComprados[0].cantidad,
                    res.productosMasComprados[1].cantidad,
                    res.productosMasComprados[2].cantidad,
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            };
          }
        },
      });
  }
  getDataProductosMenosComprados() {
    this.recepcionMercanciaService
      .obtenerProductosMenosComprados()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res.productosMenosComprados) {
            this.productosMenosComprados = {
              labels: [
                res.productosMenosComprados[0].nombre,
                res.productosMenosComprados[1].nombre,
                res.productosMenosComprados[2].nombre,
              ],
              datasets: [
                {
                  data: [
                    res.productosMenosComprados[0].cantidad,
                    res.productosMenosComprados[1].cantidad,
                    res.productosMenosComprados[2].cantidad,
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            };
          }
        },
      });
  }
}
