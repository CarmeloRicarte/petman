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
import { EnvioMercancia } from 'src/app/models/backoffice/envioMercancia.model';
import { Cliente } from 'src/app/models/backoffice/cliente.model';
import {
  ClienteService,
  ProductoService,
  EnvioMercanciaService,
} from 'src/app/services/service.index';

@Component({
  selector: 'app-gestionar-envio-mercancia',
  templateUrl: './gestionar-envio-mercancia.component.html',
  styleUrls: ['./gestionar-envio-mercancia.component.scss'],
})
export class GestionarEnvioMercanciaComponent implements OnInit, OnDestroy {
  titulo = '';
  accion = ''; // crear o editar
  envio!: EnvioMercancia;

  gestionarEnvioForm = new FormGroup({});

  crearClienteForm!: FormGroup;
  clientesDialogCrear!: boolean;
  productosEnTabla: any[] = [];
  productosSeleccionadosEnTabla: any[] = [];

  productos: Producto[] = [];
  clientes: Cliente[] = [];

  columnas: any[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private envioService: EnvioMercanciaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarForm();
    this.route.paramMap
      .pipe(map((params) => params.get('uid')))
      .subscribe((uid) => {
        if (uid) {
          this.titulo = 'Editar';
          this.accion = 'editar';
          this.cargarEnvio(uid);
        } else {
          this.titulo = 'Nuevo';
          this.accion = 'crear';
        }
      });

    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'cantidad', header: 'Cantidad' },
    ];

    this.cargarClientes();
    this.cargarProductos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarForm(): void {
    this.gestionarEnvioForm = this.fb.group({
      numEnvio: new FormControl('', Validators.required),
      fechaEnvio: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required),
      selectedProductos: new FormControl([]),
    });
  }

  cargarFormEdit(): void {
    this.gestionarEnvioForm.patchValue({
      numEnvio: this.envio.numEnvio,
      fechaEnvio: this.envio.fechaEnvio,
      cliente: this.envio.cliente,
    });
  }
  cargarEnvio(idEnvio: string): void {
    this.envioService.obtenerEnvio(idEnvio).subscribe(
      (res: any) => {
        this.envio = res.envio;
        this.cargarFormEdit();
        this.productosEnTabla = res.envio.productos;
      },
      (err: any) => {
        console.error(err);
        this.toastr.error(err, 'Error al cargar el envío de mercancía');
      }
    );
  }

  crearEnvio(envio: EnvioMercancia) {
    this.envioService.crearEnvio(envio).subscribe(
      (res: any) => {
        envio.productos.forEach((producto) => {
          this.productoService
            .actualizarCantidadProducto(producto, 'envios')
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
        this.toastr.success(
          `Envío de mercancía con núm.envío ${res.envio.numEnvio} creado!`
        );
        this.toastr.success(`Productos actualizados!`);
        this.router.navigate(['/admin/envio-mercancia']);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(
          `Error al crear el envío de mercancía: ${err.error.msg}`
        );
      }
    );
  }

  editarEnvio(envio: EnvioMercancia) {
    this.envioService.actualizarEnvio(envio).subscribe(
      (res: any) => {
        envio.productos.forEach((producto) => {
          this.productoService
            .actualizarCantidadProducto(producto, 'envios')
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

        this.toastr.success(
          `Envío de mercancía con núm.envío ${res.envio.numEnvio} actualizado!`
        );
        this.toastr.success(`Productos actualizados!`);
        this.router.navigate(['/admin/envio-mercancia']);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(
          `Error al actualizar el envío de mercancía: ${err.error.msg}`
        );
      }
    );
  }

  enviarEnvio(productos: any[], accion: string) {
    if (this.gestionarEnvioForm.invalid || this.productosEnTabla.length === 0) {
      Swal.fire(
        'Error al guardar',
        'Los campos obligatorios deben ser cumplimentados correctamente y la tabla de productos no puede estar vacía.',
        'error'
      );
      return;
    }

    const envio = {
      uid: this.envio?.uid ? this.envio.uid : '',
      numEnvio: this.gestionarEnvioForm.value.numEnvio,
      fechaEnvio: '',
      cliente: this.gestionarEnvioForm.value.cliente,
      productos,
    };

    if (this.envio?.fechaEnvio === this.gestionarEnvioForm.value.fechaEnvio) {
      envio.fechaEnvio = this.gestionarEnvioForm.value.fechaEnvio;
    } else {
      envio.fechaEnvio =
        this.gestionarEnvioForm.value.fechaEnvio.toLocaleDateString();
    }

    if (accion === 'editar') {
      this.editarEnvio(envio);
    } else {
      this.crearEnvio(envio);
    }
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
    this.productoService.obtenerProductos().subscribe(
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
    this.gestionarEnvioForm.controls.selectedProductos.reset([]);
  }

  eliminarProductoTabla(producto: Producto) {
    this.productosEnTabla = this.productosEnTabla.filter(
      (productoTabla) => productoTabla !== producto
    );
    console.log(this.productosEnTabla);
  }

  clearTable() {
    this.productosEnTabla = [];
  }
}
