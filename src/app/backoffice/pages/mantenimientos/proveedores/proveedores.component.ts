import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Proveedor } from 'src/app/models/backoffice/proveedor.model';
import { ProveedorService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
  styles: [
    `
      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-proveedores.p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-proveedores
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
})
export class ProveedoresComponent implements OnInit, OnDestroy {
  proveedores: Proveedor[] = [];
  proveedor!: Proveedor;

  proveedoresDialogCrear!: boolean;
  crearProveedorForm!: FormGroup;

  proveedoresDialogEditar!: boolean;
  editarProveedorForm!: FormGroup;

  proveedoresSeleccionados: any = [];

  pulsadoSubmit!: boolean;
  columnas: any[] = [];
  totalProveedores = 0;

  subscription: Subscription = new Subscription();

  constructor(
    private proveedorService: ProveedorService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'categoria', header: 'Categoría' },
      { field: 'poblacion', header: 'Población' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'cif', header: 'CIF' },
      { field: 'email', header: 'Email' },
      { field: 'web', header: 'Web' },
    ];
    this.crearProveedorForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      poblacion: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      cif: new FormControl('', [
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.required,
      ]),
      email: new FormControl('', Validators.email),
      web: new FormControl(''),
    });

    this.editarProveedorForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      poblacion: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      cif: new FormControl('', [
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.required,
      ]),
      email: new FormControl('', Validators.email),
      web: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get crearProveedorF() {
    return this.crearProveedorForm.controls;
  }

  get editarProveedorF() {
    return this.editarProveedorForm.controls;
  }

  /**
   * metodo para obtener los proveedores
   */
  cargarProveedores() {
    this.proveedorService.obtenerProveedores().subscribe(
      (res: any) => {
        this.proveedores = res.proveedores;
        this.totalProveedores = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  crearProveedor(): void {
    this.pulsadoSubmit = false;
    this.crearProveedorForm.reset();
    this.proveedoresDialogCrear = true; // abrimos el cuadro de dialogo para crear el proveedor
  }

  editarProveedor(proveedor: Proveedor): void {
    this.proveedor = { ...proveedor };
    this.editarProveedorForm.reset();
    this.proveedoresDialogEditar = true;
  }

  guardarProveedor(proveedor: any, accion: 'crear' | 'editar'): void {
    this.pulsadoSubmit = true;
    if (accion === 'editar') {
      if (this.editarProveedorForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.proveedorService.actualizarProveedor(proveedor).subscribe(
        (res: any) => {
          this.toastr.success(`Proveedor ${res.proveedor.nombre} actualizado!`);
          this.ocultarProveedoresDialog(accion);
          this.cargarProveedores();
        },
        (err: any) => {
          console.log(err);
          this.ocultarProveedoresDialog(accion);
          this.cargarProveedores();
          this.toastr.error(
            `Error al actualizar el proveedor: ${err.error.msg}`
          );
        }
      );
    } else {
      if (this.crearProveedorForm.invalid) {
        // si el formulario no es correcto, para ejecucion
        return;
      }
      this.proveedorService.crearProveedor(proveedor).subscribe(
        (res: any) => {
          this.toastr.success(`Proveedor ${res.proveedor.nombre} creado!`);
          this.ocultarProveedoresDialog(accion);
          this.cargarProveedores();
        },
        (err: any) => {
          this.toastr.error(`Error al crear el proveedor: ${err.error.msg}`);
          this.ocultarProveedoresDialog(accion);
          this.cargarProveedores();
        }
      );
    }
  }

  /**
   * Metodo que llama al servicio para eliminar un proveedor
   * @param proveedor proveedor a eliminar
   */
  eliminarProveedor(proveedor: Proveedor) {
    Swal.fire({
      title: '¿Borrar proveedor?',
      text: `Está a punto de borrar a ${proveedor.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result: any) => {
      if (result.value) {
        this.proveedorService.eliminarProveedor(proveedor).subscribe(
          () => {
            Swal.fire(
              'Eliminado!',
              `${proveedor.nombre} fue eliminado correctamente`,
              'success'
            );
            this.cargarProveedores();
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    });
  }

  eliminarProveedoresSeleccionados() {
    Swal.fire({
      title: '¿Borrar proveedores seleccionados?',
      text: `Está a punto de borrar a ${this.proveedoresSeleccionados.length} proveedores, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlos!',
    }).then((result: any) => {
      if (result.value) {
        this.proveedorService
          .eliminarProveedores(this.proveedoresSeleccionados)
          .subscribe(
            (res) => {
              Swal.fire('Eliminados!', `${res.msg}`, 'success');
              this.cargarProveedores();
            },
            (err: any) => {
              console.error(err);
            }
          );
      }
    });
  }

  ocultarProveedoresDialog(accion: 'crear' | 'editar') {
    if (accion === 'crear') {
      this.proveedoresDialogCrear = false;
    } else {
      this.proveedoresDialogEditar = false;
    }

    this.pulsadoSubmit = false;
  }
}
