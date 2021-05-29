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
import { Categoria } from 'src/app/models/backoffice/categoria.model';
import { Producto } from 'src/app/models/backoffice/producto.model';
import { Proveedor } from 'src/app/models/backoffice/proveedor.model';
import { RecepcionMercancia } from 'src/app/models/backoffice/recepcionMercancia.model';
import { Subcategoria } from 'src/app/models/backoffice/subcategoria.model';
import {
  CategoriaService,
  ProductoService,
  ProveedorService,
  RecepcionMercanciaService,
  SubcategoriaService,
} from 'src/app/services/service.index';

@Component({
  selector: 'app-gestionar-recepcion-mercancia',
  templateUrl: './gestionar-recepcion-mercancia.component.html',
  styleUrls: ['./gestionar-recepcion-mercancia.component.scss'],
})
export class GestionarRecepcionMercanciaComponent implements OnInit, OnDestroy {
  titulo = '';
  accion = ''; // crear o editar
  recepcion!: RecepcionMercancia;

  gestionarRecepcionForm = new FormGroup({});

  crearProductoForm!: FormGroup;
  productosDialogCrear!: boolean;
  productosEnTabla: any[] = [];
  productosSeleccionadosEnTabla: any[] = [];

  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];

  columnas: any[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private recepcionService: RecepcionMercanciaService,
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
          this.cargarRecepcion(uid);
        } else {
          this.titulo = 'Nueva';
          this.accion = 'crear';
        }
      });

    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'cantidad', header: 'Cantidad' },
    ];

    this.cargarProveedores();
    this.cargarProductos();

    this.cargarAddProductoForm();
    this.cargarCategorias();
    this.cargarSubcategorias();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarForm(): void {
    this.gestionarRecepcionForm = this.fb.group({
      numPedido: new FormControl('', Validators.required),
      fechaRecepcion: new FormControl('', Validators.required),
      proveedor: new FormControl('', Validators.required),
      selectedProductos: new FormControl([]),
    });
  }

  cargarFormEdit(): void {
    this.gestionarRecepcionForm.patchValue({
      numPedido: this.recepcion.numPedido,
      fechaRecepcion: this.recepcion.fechaRecepcion,
      proveedor: this.recepcion.proveedor,
    });
  }

  cargarAddProductoForm(): void {
    this.crearProductoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      proveedor: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      peso: new FormControl('', Validators.required),
      unidadMedida: new FormControl('', Validators.required),
    });
  }

  get crearProductoF() {
    return this.crearProductoForm.controls;
  }
  cargarRecepcion(idRecepcion: string): void {
    this.recepcionService.obtenerRecepcion(idRecepcion).subscribe(
      (res: any) => {
        this.recepcion = res.recepcion;
        this.cargarFormEdit();
        this.productosEnTabla = res.recepcion.productos;
      },
      (err: any) => {
        console.error(err);
        this.toastr.error(err, 'Error al cargar la recepción de mercancía');
      }
    );
  }

  crearRecepcion(recepcion: RecepcionMercancia) {
    this.recepcionService.crearRecepcion(recepcion).subscribe(
      (res: any) => {
        this.toastr.success(
          `Recepción de mercancía con núm.pedido ${res.recepcion.numPedido} creada!`
        );
        this.router.navigate(['/admin/recepcion-mercancia']);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(
          `Error al crear la recepción de mercancía: ${err.error.msg}`
        );
      }
    );
  }

  editarRecepcion(recepcion: RecepcionMercancia) {
    this.recepcionService.actualizarRecepcion(recepcion).subscribe(
      (res: any) => {
        recepcion.productos.forEach((producto) => {
          this.productoService.actualizarCantidadProducto(producto).subscribe(
            (resCantidad: any) => {
              console.log(resCantidad);
              this.productoService.actualizarPrecioProducto(producto).subscribe(
                (resPrecio: any) => {
                  console.log(resPrecio);
                },
                (err: any) => {
                  console.log(err);
                  this.toastr.error(
                    `Error al actualizar el precio del producto: ${err.error.msg}`
                  );
                }
              );
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
          `Recepción de mercancía con núm.pedido ${res.recepcion.numPedido} actualizada!`
        );
        this.toastr.success(`Productos actualizados!`);
        this.router.navigate(['/admin/recepcion-mercancia']);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(
          `Error al actualizar la recepción de mercancía: ${err.error.msg}`
        );
      }
    );
  }

  enviarRecepcion(productos: any[], accion: string) {
    if (
      this.gestionarRecepcionForm.invalid ||
      this.productosEnTabla.length === 0
    ) {
      Swal.fire(
        'Error al guardar',
        'Los campos obligatorios deben ser cumplimentados correctamente y la tabla de productos no puede estar vacía.',
        'error'
      );
      return;
    }

    const recepcion = {
      uid: this.recepcion.uid ? this.recepcion.uid : '',
      numPedido: this.gestionarRecepcionForm.value.numPedido,
      fechaRecepcion:
        typeof this.gestionarRecepcionForm.value.fechaRecepcion !== 'string'
          ? this.gestionarRecepcionForm.value.fechaRecepcion.toLocaleDateString()
          : this.gestionarRecepcionForm.value.fechaRecepcion,
      proveedor: this.gestionarRecepcionForm.value.proveedor,
      productos,
    };

    if (accion === 'editar') {
      this.editarRecepcion(recepcion);
    } else {
      this.crearRecepcion(recepcion);
    }
  }

  cargarProveedores() {
    this.proveedorService.obtenerProveedores().subscribe(
      (res: any) => {
        this.proveedores = res.proveedores;
        this.proveedores.unshift({
          nombre: 'Seleccione Proveedor',
          categoria: '',
          poblacion: '',
          direccion: '',
          telefono: '',
          cif: '',
          uid: '23423asdffgzd',
        });
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

  /**
   * metodo para obtener las subcategorias
   */
  cargarSubcategorias() {
    this.subcategoriaService.obtenerSubcategorias().subscribe(
      (res: any) => {
        this.subcategorias = res.subcategorias;
        this.subcategorias.unshift({
          nombre: 'Seleccione Subcategoría',
          categoria: 'sdg234rtaef',
          uid: '23423asdffgzd',
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**
   * metodo para obtener las categorias
   */
  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      (res: any) => {
        this.categorias = res.categorias;
        this.categorias.unshift({
          nombre: 'Seleccione Categoría',
          uid: '23423asdffgzd',
        });
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
    this.gestionarRecepcionForm.controls.selectedProductos.reset([]);
  }

  addProducto(producto: Producto) {
    if (this.crearProductoForm.invalid) {
      // si el formulario no es correcto, para ejecucion
      return;
    }
    this.productoService.crearProducto(producto).subscribe(
      (res: any) => {
        this.toastr.success(`Producto ${res.producto.nombre} creado!`);
        this.ocultarProductosDialog();
        this.productosEnTabla.push(res.producto);
      },
      (err: any) => {
        this.toastr.error(`Error al crear el producto: ${err.error.msg}`);
        this.ocultarProductosDialog();
      }
    );
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

  crearProducto(): void {
    this.crearProductoForm.reset();
    this.productosDialogCrear = true; // abrimos el cuadro de dialogo para crear el producto
  }

  ocultarProductosDialog(): void {
    this.productosDialogCrear = false;
  }
}
