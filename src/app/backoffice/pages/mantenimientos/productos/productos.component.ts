import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Subcategoria } from 'src/app/models/backoffice/subcategoria.model';
import {
  CategoriaService,
  ProductoService,
  ProveedorService,
  SubcategoriaService,
  UsuarioService,
} from 'src/app/services/service.index';
import { Categoria } from 'src/app/models/backoffice/categoria.model';
import { Producto } from 'src/app/models/backoffice/producto.model';
import { Proveedor } from 'src/app/models/backoffice/proveedor.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-productos.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-productos
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class ProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  producto!: Producto;

  subcategorias: Subcategoria[] = [];
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  productosDialogCrear!: boolean;
  crearProductoForm!: FormGroup;

  productosDialogEditar!: boolean;
  editarProductoForm!: FormGroup;

  productosSeleccionados: any = [];

  pulsadoSubmit!: boolean;
  columnas: any[] = [];
  totalProductos = 0;

  subscription: Subscription = new Subscription();

  constructor(
    private productoService: ProductoService,
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    public usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarSubcategorias();
    this.cargarCategorias();
    this.cargarProveedores();
    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'cantidad', header: 'Stock' },
    ];
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

    this.editarProductoForm = this.fb.group({
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get crearProductoF() {
    return this.crearProductoForm.controls;
  }

  get editarProductoF() {
    return this.editarProductoForm.controls;
  }

  /**
   * metodo para obtener los productos
   */
  cargarProductos() {
    this.productoService.obtenerProductos().subscribe(
      (res: any) => {
        this.productos = res.productos;
        this.totalProductos = res.total;
      },
      (err) => {
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
      (err) => {
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
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * metodo para obtener los proveedores
   */
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

  crearProducto(): void {
    this.pulsadoSubmit = false;
    this.crearProductoForm.reset();
    this.productosDialogCrear = true; // abrimos el cuadro de dialogo para crear el producto
  }

  editarProducto(producto: Producto): void {
    this.producto = { ...producto };
    this.editarProductoForm.reset();
    this.productosDialogEditar = true;
  }

  guardarProducto(producto: any, accion: 'crear' | 'editar'): void {
    this.pulsadoSubmit = true;
    if (accion === 'editar') {
      if (this.editarProductoForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.productoService.actualizarProducto(producto).subscribe(
        (res: any) => {
          this.toastr.success(`Producto ${res.producto.nombre} actualizado!`);
          this.ocultarProductosDialog(accion);
          this.cargarProductos();
        },
        (err: any) => {
          console.log(err);
          this.ocultarProductosDialog(accion);
          this.cargarProductos();
          this.toastr.error(
            `Error al actualizar el producto: ${err.error.msg}`
          );
        }
      );
    } else {
      if (this.crearProductoForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.productoService.crearProducto(producto).subscribe(
        (res: any) => {
          this.toastr.success(`Producto ${res.producto.nombre} creado!`);
          this.ocultarProductosDialog(accion);
          this.cargarProductos();
        },
        (err: any) => {
          this.toastr.error(`Error al crear el producto: ${err.error.msg}`);
          this.ocultarProductosDialog(accion);
          this.cargarProductos();
        }
      );
    }
  }

  /**
   * Metodo que llama al servicio para eliminar un producto
   * @param producto producto a eliminar
   */
  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Borrar producto?',
      text: `Está a punto de borrar a ${producto.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result: any) => {
      if (result.value) {
        this.productoService.eliminarProducto(producto).subscribe(
          () => {
            Swal.fire(
              'Eliminado!',
              `${producto.nombre} fue eliminado correctamente`,
              'success'
            );
            this.cargarProductos();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarProductosSeleccionados() {
    Swal.fire({
      title: '¿Borrar productos seleccionados?',
      text: `Está a punto de borrar a ${this.productosSeleccionados.length} productos, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlos!',
    }).then((result: any) => {
      if (result.value) {
        this.productoService
          .eliminarProductos(this.productosSeleccionados)
          .subscribe(
            (res: any) => {
              Swal.fire('Eliminados!', `${res.msg}`, 'success');
              this.cargarProductos();
            },
            (err: any) => {
              console.error(err);
            }
          );
      }
    });
  }

  ocultarProductosDialog(accion: 'crear' | 'editar') {
    if (accion === 'crear') {
      this.productosDialogCrear = false;
    } else {
      this.productosDialogEditar = false;
    }

    this.pulsadoSubmit = false;
  }
}
