import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/backoffice/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-users.p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-users .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }
  `],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario!: Usuario;

  usuariosDialogCrear!: boolean;
  crearUsuarioForm!: FormGroup;

  usuariosDialogEditar!: boolean;
  editarUsuarioForm!: FormGroup;

  usuariosSeleccionados: any = [];

  pulsadoSubmit!: boolean;
  columnas: any[] = [];
  totalUsuarios = 0;

  cargando = true;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'nick', header: 'Nick' },
      { field: 'role', header: 'Rol' }
    ];
    this.crearUsuarioForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      nick: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })

    this.editarUsuarioForm = this.fb.group({
      uid: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      nick: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  get crearUsuarioF() {
    return this.crearUsuarioForm.controls;
  }

  get editarUsuarioF() {
    return this.editarUsuarioForm.controls;
  }

  /**
     * metodo para obtener los usuarios
     */
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios()
      .subscribe((res: any) => {
        this.usuarios = res.usuarios;
        this.cargando = false;
        this.totalUsuarios = res.total;
      }, (err) => {
        console.log(err);
      })
  }

  crearUsuario() {
    this.pulsadoSubmit = false;
    this.crearUsuarioForm.reset();
    this.usuariosDialogCrear = true; // abrimos el cuadro de dialogo para crear el usuario
  }

  editarUsuario(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.editarUsuarioForm.reset();
    this.usuariosDialogEditar = true;
  }

  guardarUsuario(usuario: any, accion: 'crear' | 'editar'): void {
    this.pulsadoSubmit = true;
    if (accion === 'editar') {
      if (this.editarUsuarioForm.invalid) { // si el formulario no es correcto, para ejecucion
        return;
      }
      this.usuarioService.actualizarUsuario(usuario, 'usuarios').toPromise().then(
        (res) => {
          this.toastr.success(`Usuario ${res.usuario.nick} actualizado!`);
          this.ocultarUsuariosDialog(accion);
          this.cargarUsuarios();
        }, (err) => {
          console.log(err);
          this.ocultarUsuariosDialog(accion);
          this.cargarUsuarios();
          this.toastr.error(`Error al actualizar el usuario: ${err.error.msg}`);
        }
      )
    } else {
      if (this.crearUsuarioForm.invalid) { // si el formulario no es correcto, para ejecucion
        return;
      }
      this.usuarioService.crearUsuario(usuario).toPromise().then(
        () => {
          this.ocultarUsuariosDialog(accion);
          this.cargarUsuarios();
        }, () => {
          this.ocultarUsuariosDialog(accion);
          this.cargarUsuarios();
        }
      )
    }

  }

  /**
     * Metodo que llama al servicio para eliminar un usuario
     * @param usuario usuario a eliminar
     */
  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire(
        'Error',
        'No puede borrarse a sí mismo',
        'error'
      );
    } else {
      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Está a punto de borrar a ${usuario.nick}`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!'
      }).then((result: any) => {
        if (result.value) {
          this.usuarioService.eliminarUsuario(usuario)
            .subscribe(() => {
              Swal.fire(
                'Eliminado!',
                `${usuario.nick} fue eliminado correctamente`,
                'success'
              );
              this.cargarUsuarios();
            }, (err) => {
              console.error(err);
            });
        }
      });
    }
  }

  eliminarUsuariosSeleccionados() {
    let mismoUsuario = false;
    Swal.fire({
      title: '¿Borrar usuarios seleccionados?',
      text: `Está a punto de borrar a ${this.usuariosSeleccionados.length} usuarios, está seguro?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlos!'
    }).then((result: any) => {
      if (result.value) {
        this.usuariosSeleccionados.forEach((usuario: Usuario) => {
          if (usuario.uid === this.usuarioService.uid) {
            Swal.fire(
              'Error',
              'No puede borrarse a sí mismo',
              'error'
            );
            mismoUsuario = true;
          }
        })

        if (!mismoUsuario) {
          this.usuarioService.eliminarUsuarios(this.usuariosSeleccionados)
            .subscribe((res) => {
              Swal.fire(
                'Eliminados!',
                `${res.msg}`,
                'success'
              );
              this.cargarUsuarios();
            }, (err: any) => {
              console.error(err);
            });
        }

      }
    });
  }

  ocultarUsuariosDialog(accion: 'crear' | 'editar') {
    if (accion === 'crear') {
      this.usuariosDialogCrear = false;
    } else {
      this.usuariosDialogEditar = false;
    }

    this.pulsadoSubmit = false;
  }
}



