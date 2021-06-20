import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/backoffice/producto.model';
import { Venta } from '../../../../../models/backoffice/venta.model';
import { Cliente } from 'src/app/models/backoffice/cliente.model';
import {
  ClienteService,
  ProductoService,
  TpvService,
} from 'src/app/services/service.index';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.scss'],
})
export class CrearVentaComponent implements OnInit, OnDestroy {
  titulo = '';
  accion = ''; // crear o visualizar
  venta!: Venta;
  importeTotal = 0;
  gestionarVentaForm = new FormGroup({});

  productosEnTabla: any[] = [];
  productosSeleccionadosEnTabla: any[] = [];

  productos: Producto[] = [];
  clientes: Cliente[] = [];

  columnas: any[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private tpvService: TpvService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarForm();
    this.route.paramMap
      .pipe(map((params) => params.get('uid')))
      .subscribe((uid) => {
        if (uid) {
          this.titulo = 'Visualizar';
          this.accion = 'visualizar';
          this.cargarVenta(uid);
        } else {
          this.titulo = 'Nueva';
          this.accion = 'crear';
        }
      });

    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'precio', header: 'Precio' },
      { field: 'importe', header: 'Importe' },
    ];

    this.cargarClientes();
    this.cargarProductos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarForm(): void {
    this.gestionarVentaForm = this.fb.group({
      cliente: new FormControl('', Validators.required),
      formaPago: new FormControl(undefined, Validators.required),
      selectedProductos: new FormControl([]),
    });
  }

  cargarFormWatch(): void {
    this.gestionarVentaForm.patchValue({
      cliente: this.venta.cliente,
      formaPago: this.venta.formaPago,
    });
    this.importeTotal = this.venta.importeTotal;
  }
  cargarVenta(idVenta: string): void {
    this.tpvService.obtenerVenta(idVenta).subscribe(
      (res: any) => {
        this.venta = res.venta;
        this.cargarFormWatch();
        this.productosEnTabla = res.venta.productos;
      },
      (err: any) => {
        console.error(err);
        this.toastr.error(err, 'Error al cargar la venta');
      }
    );
  }

  crearVenta(venta: Venta) {
    this.tpvService.crearVenta(venta).subscribe(
      (res: any) => {
        venta.productos.forEach((producto) => {
          this.productoService
            .actualizarCantidadProducto(producto, 'ventas')
            .subscribe(
              (resCantidad: any) => {
                console.log(resCantidad);
              },
              (err: any) => {
                console.log(err);
                this.toastr.error(
                  `Error al actualizar el stock del producto: ${err.error.msg}`
                );
              }
            );
        });
        this.toastr.success(`Venta creada de forma satisfactoria!`);
        this.toastr.success(`Productos actualizados!`);
        this.router.navigate(['/admin/tpv/listado-ventas']);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(`Error al crear la venta: ${err.error.msg}`);
      }
    );
  }

  enviarVenta(productos: any[]) {
    if (this.gestionarVentaForm.invalid || this.productosEnTabla.length === 0) {
      Swal.fire(
        'Error al crear la venta',
        'Los campos deben ser cumplimentados correctamente y la tabla de productos no puede estar vacía.',
        'error'
      );
      return;
    }

    const venta = {
      uid: '',
      cliente: this.gestionarVentaForm.value.cliente,
      productos,
      importeTotal: this.importeTotal,
      formaPago: this.gestionarVentaForm.value.formaPago,
      fechaVenta: new Date(),
    };

    this.crearVenta(venta);
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe(
      (res: any) => {
        this.clientes = res.clientes;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargarProductos() {
    this.productoService.obtenerProductosConStock().subscribe(
      (res: any) => {
        this.productos = res.productos;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  addSelectedProducts(productosSeleccionados: any[]): void {
    productosSeleccionados.forEach((producto) => {
      producto.cantidad = 1; // cambiamos la cantidad a 1 para luego indicar la necesaria
      this.productosEnTabla.push(producto);
    });
    this.gestionarVentaForm.controls.selectedProductos.reset([]);
    this.calcularImporteTotal(this.productosEnTabla);
  }

  eliminarProductoTabla(producto: Producto) {
    this.productosEnTabla = this.productosEnTabla.filter(
      (productoTabla) => productoTabla !== producto
    );
    this.calcularImporteTotal(this.productosEnTabla);
  }

  clearTable() {
    this.productosEnTabla = [];
    this.importeTotal = 0;
  }

  calcularImporteTotal(productos: any[]) {
    this.importeTotal = 0;
    productos.forEach((producto) => {
      const importeProducto = producto.precio * producto.cantidad;
      this.importeTotal += importeProducto;
    });
  }
}
