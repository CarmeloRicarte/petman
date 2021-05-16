import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from 'src/app/models/backoffice/cliente.model';
import { ClienteService } from 'src/app/services/service.index';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-clientes.p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-clientes .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }
  `],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente!: Cliente;

  clientesDialogCrear!: boolean;
  crearClienteForm!: FormGroup;

  clientesDialogEditar!: boolean;
  editarClienteForm!: FormGroup;

  clientesSeleccionados: any = [];

  pulsadoSubmit!: boolean;
  columnas: any[] = [];
  totalClientes = 0;

  constructor(private clienteService: ClienteService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'poblacion', header: 'Población' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'email', header: 'Email' },
      { field: 'dni', header: 'DNI' }

    ];
    this.crearClienteForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      poblacion: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]*$'),
        Validators.maxLength(9),
        Validators.minLength(9)]
      ),
      email: new FormControl('', Validators.email),
      dni: new FormControl('', [
        Validators.maxLength(9),
        Validators.minLength(9)
      ])
    })

    this.editarClienteForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      poblacion: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]*$'),
        Validators.maxLength(9),
        Validators.minLength(9)]
      ),
      email: new FormControl('', Validators.email),
      dni: new FormControl('', [
        Validators.maxLength(9),
        Validators.minLength(9)
      ])
    })
  }

  get crearClienteF() {
    return this.crearClienteForm.controls;
  }

  get editarClienteF() {
    return this.editarClienteForm.controls;
  }

  /**
     * metodo para obtener los clientes
     */
  cargarClientes() {
    this.clienteService.obtenerClientes()
      .subscribe((res: any) => {
        this.clientes = res.clientes;
        this.totalClientes = res.total;
      }, (err) => {
        console.log(err);
      })
  }

  crearCliente() {
    this.pulsadoSubmit = false;
    this.crearClienteForm.reset();
    this.clientesDialogCrear = true; // abrimos el cuadro de dialogo para crear el usuario
  }

  editarCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.editarClienteForm.reset();
    this.clientesDialogEditar = true;
  }

  guardarCliente(cliente: any, accion: 'crear' | 'editar'): void {
    this.pulsadoSubmit = true;
    if (accion === 'editar') {
      if (this.editarClienteForm.invalid) { // si el formulario no es correcto, para ejecucion
        return;
      }
      this.clienteService.actualizarCliente(cliente).toPromise().then(
        (res: any) => {
          this.toastr.success(`Cliente ${res.cliente.nombre} ${res.cliente.apellidos} actualizado!`);
          this.ocultarClientesDialog(accion);
          this.cargarClientes();
        }, (err: any) => {
          console.log(err);
          this.ocultarClientesDialog(accion);
          this.cargarClientes();
          this.toastr.error(`Error al actualizar el cliente: ${err.error.msg}`);
        }
      )
    } else {
      if (this.crearClienteForm.invalid) { // si el formulario no es correcto, para ejecucion
        return;
      }
      this.clienteService.crearCliente(cliente).toPromise().then(
        () => {
          this.ocultarClientesDialog(accion);
          this.cargarClientes();
        }, () => {
          this.ocultarClientesDialog(accion);
          this.cargarClientes();
        }
      )
    }

  }

  /**
     * Metodo que llama al servicio para eliminar un cliente
     * @param cliente cliente a eliminar
     */
  eliminarCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Borrar cliente?',
      text: `Está a punto de borrar a ${cliente.nombre} ${cliente.apellidos}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result: any) => {
      if (result.value) {
        this.clienteService.eliminarCliente(cliente)
          .subscribe(() => {
            Swal.fire(
              'Eliminado!',
              `${cliente.nombre} ${cliente.apellidos} fue eliminado correctamente`,
              'success'
            );
            this.cargarClientes();
          }, (err: any) => {
            console.error(err);
          });
      }
    });
  }

  eliminarClientesSeleccionados() {
    Swal.fire({
      title: '¿Borrar clientes seleccionados?',
      text: `Está a punto de borrar a ${this.clientesSeleccionados.length} clientes, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlos!'
    }).then((result: any) => {
      if (result.value) {
        this.clienteService.eliminarClientes(this.clientesSeleccionados)
          .subscribe((res) => {
            Swal.fire(
              'Eliminados!',
              `${res.msg}`,
              'success'
            );
            this.cargarClientes();
          }, (err: any) => {
            console.error(err);
          });
      }
    });
  }

  ocultarClientesDialog(accion: 'crear' | 'editar') {
    if (accion === 'crear') {
      this.clientesDialogCrear = false;
    } else {
      this.clientesDialogEditar = false;
    }

    this.pulsadoSubmit = false;
  }
}
