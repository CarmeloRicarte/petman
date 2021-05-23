import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/backoffice/categoria.model';
import { CategoriaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-categorias.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-categorias
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class CategoriasComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  categoria!: Categoria;

  categoriasDialogCrear!: boolean;
  crearCategoriaForm!: FormGroup;

  categoriasDialogEditar!: boolean;
  editarCategoriaForm!: FormGroup;

  categoriasSeleccionadas: any = [];

  pulsadoSubmit!: boolean;
  columnas: any[] = [];
  totalCategorias = 0;

  subscription: Subscription = new Subscription();

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.columnas = [{ field: 'nombre', header: 'Nombre' }];
    this.crearCategoriaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
    });

    this.editarCategoriaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get crearCategoriaF() {
    return this.crearCategoriaForm.controls;
  }

  get editarCategoriaF() {
    return this.editarCategoriaForm.controls;
  }

  /**
   * metodo para obtener las categorias
   */
  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      (res: any) => {
        this.categorias = res.categorias;
        this.totalCategorias = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  crearCategoria(): void {
    this.pulsadoSubmit = false;
    this.crearCategoriaForm.reset();
    this.categoriasDialogCrear = true; // abrimos el cuadro de dialogo para crear la categoria
  }

  editarCategoria(categoria: Categoria): void {
    this.categoria = { ...categoria };
    this.editarCategoriaForm.reset();
    this.categoriasDialogEditar = true;
  }

  guardarCategoria(categoria: any, accion: 'crear' | 'editar'): void {
    this.pulsadoSubmit = true;
    if (accion === 'editar') {
      if (this.editarCategoriaForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.categoriaService.actualizarCategoria(categoria).subscribe(
        (res: any) => {
          this.toastr.success(`Categoría ${res.categoria.nombre} actualizada!`);
          this.ocultarCategoriasDialog(accion);
          this.cargarCategorias();
        },
        (err: any) => {
          console.log(err);
          this.ocultarCategoriasDialog(accion);
          this.cargarCategorias();
          this.toastr.error(
            `Error al actualizar la categoría: ${err.error.msg}`
          );
        }
      );
    } else {
      if (this.crearCategoriaForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.categoriaService.crearCategoria(categoria).subscribe(
        (res: any) => {
          this.toastr.success(`Categoría ${res.categoria.nombre} creada!`);
          this.ocultarCategoriasDialog(accion);
          this.cargarCategorias();
        },
        (err: any) => {
          this.toastr.error(`Error al crear la categoría: ${err.error.msg}`);
          this.ocultarCategoriasDialog(accion);
          this.cargarCategorias();
        }
      );
    }
  }

  /**
   * Metodo que llama al servicio para eliminar una categoria
   * @param categoria categoria a eliminar
   */
  eliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: '¿Borrar categoría?',
      text: `Está a punto de borrar a ${categoria.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!',
    }).then((result: any) => {
      if (result.value) {
        this.categoriaService.eliminarCategoria(categoria).subscribe(
          () => {
            Swal.fire(
              'Eliminada!',
              `${categoria.nombre} fue eliminada correctamente`,
              'success'
            );
            this.cargarCategorias();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarCategoriasSeleccionadas() {
    Swal.fire({
      title: '¿Borrar categorías seleccionados?',
      text: `Está a punto de borrar a ${this.categoriasSeleccionadas.length} categorías, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlas!',
    }).then((result: any) => {
      if (result.value) {
        this.categoriaService
          .eliminarCategorias(this.categoriasSeleccionadas)
          .subscribe(
            (res: any) => {
              Swal.fire('Eliminadas!', `${res.msg}`, 'success');
              this.cargarCategorias();
            },
            (err: any) => {
              console.error(err);
            }
          );
      }
    });
  }

  ocultarCategoriasDialog(accion: 'crear' | 'editar') {
    if (accion === 'crear') {
      this.categoriasDialogCrear = false;
    } else {
      this.categoriasDialogEditar = false;
    }

    this.pulsadoSubmit = false;
  }
}
