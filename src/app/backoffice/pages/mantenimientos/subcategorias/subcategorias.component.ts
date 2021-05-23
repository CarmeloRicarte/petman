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
  SubcategoriaService,
} from 'src/app/services/service.index';
import { Categoria } from 'src/app/models/backoffice/categoria.model';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-subcategorias.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-subcategorias
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class SubcategoriasComponent implements OnInit, OnDestroy {
  subcategorias: Subcategoria[] = [];
  subcategoria!: Subcategoria;

  categorias: Categoria[] = [];

  subcategoriasDialogCrear!: boolean;
  crearSubcategoriaForm!: FormGroup;

  subcategoriasDialogEditar!: boolean;
  editarSubcategoriaForm!: FormGroup;

  subcategoriasSeleccionadas: any = [];

  pulsadoSubmit!: boolean;
  columnas: any[] = [];
  totalSubcategorias = 0;

  subscription: Subscription = new Subscription();

  constructor(
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarSubcategorias();
    this.cargarCategorias();
    this.columnas = [{ field: 'nombre', header: 'Nombre' }];
    this.crearSubcategoriaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
    });

    this.editarSubcategoriaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get crearSubcategoriaF() {
    return this.crearSubcategoriaForm.controls;
  }

  get editarSubcategoriaF() {
    return this.editarSubcategoriaForm.controls;
  }

  /**
   * metodo para obtener las subcategorias
   */
  cargarSubcategorias() {
    this.subcategoriaService.obtenerSubcategorias().subscribe(
      (res: any) => {
        this.subcategorias = res.subcategorias;
        this.totalSubcategorias = res.total;
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

  crearSubcategoria(): void {
    this.pulsadoSubmit = false;
    this.crearSubcategoriaForm.reset();
    this.subcategoriasDialogCrear = true; // abrimos el cuadro de dialogo para crear la subcategoria
  }

  editarSubcategoria(subcategoria: Subcategoria): void {
    this.subcategoria = { ...subcategoria };
    this.editarSubcategoriaForm.reset();
    this.subcategoriasDialogEditar = true;
  }

  guardarSubcategoria(subcategoria: any, accion: 'crear' | 'editar'): void {
    this.pulsadoSubmit = true;
    if (accion === 'editar') {
      if (this.editarSubcategoriaForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.subcategoriaService.actualizarSubcategoria(subcategoria).subscribe(
        (res: any) => {
          this.toastr.success(
            `Subcategoria ${res.subcategoria.nombre} actualizada!`
          );
          this.ocultarSubcategoriasDialog(accion);
          this.cargarSubcategorias();
        },
        (err: any) => {
          console.log(err);
          this.ocultarSubcategoriasDialog(accion);
          this.cargarSubcategorias();
          this.toastr.error(
            `Error al actualizar la subcategoría: ${err.error.msg}`
          );
        }
      );
    } else {
      if (this.crearSubcategoriaForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.subcategoriaService.crearSubcategoria(subcategoria).subscribe(
        (res: any) => {
          this.toastr.success(
            `Subcategoría ${res.subcategoria.nombre} creada!`
          );
          this.ocultarSubcategoriasDialog(accion);
          this.cargarSubcategorias();
        },
        (err: any) => {
          this.toastr.error(`Error al crear la subcategoría: ${err.error.msg}`);
          this.ocultarSubcategoriasDialog(accion);
          this.cargarSubcategorias();
        }
      );
    }
  }

  /**
   * Metodo que llama al servicio para eliminar una subcategoria
   * @param subcategoria subcategoria a eliminar
   */
  eliminarSubcategoria(subcategoria: Subcategoria) {
    Swal.fire({
      title: '¿Borrar subcategoría?',
      text: `Está a punto de borrar a ${subcategoria.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!',
    }).then((result: any) => {
      if (result.value) {
        this.subcategoriaService.eliminarSubcategoria(subcategoria).subscribe(
          () => {
            Swal.fire(
              'Eliminada!',
              `${subcategoria.nombre} fue eliminada correctamente`,
              'success'
            );
            this.cargarSubcategorias();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarSubcategoriasSeleccionadas() {
    Swal.fire({
      title: '¿Borrar subcategorías seleccionadas?',
      text: `Está a punto de borrar a ${this.subcategoriasSeleccionadas.length} subcategorías, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlas!',
    }).then((result: any) => {
      if (result.value) {
        this.subcategoriaService
          .eliminarSubcategorias(this.subcategoriasSeleccionadas)
          .subscribe(
            (res: any) => {
              Swal.fire('Eliminadas!', `${res.msg}`, 'success');
              this.cargarSubcategorias();
            },
            (err: any) => {
              console.error(err);
            }
          );
      }
    });
  }

  ocultarSubcategoriasDialog(accion: 'crear' | 'editar') {
    if (accion === 'crear') {
      this.subcategoriasDialogCrear = false;
    } else {
      this.subcategoriasDialogEditar = false;
    }

    this.pulsadoSubmit = false;
  }
}
