import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/backoffice/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardarUsuario(usuario: Usuario): void {
    this.usuario.nombre = usuario.nombre;
    this.usuario.nick = usuario.nick;
    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe(
        (resp: any) => this.toastr.success(`Usuario ${resp.usuario.nick} actualizado!`),
        (error: any) => this.toastr.error(`Error al actualizar el usuario: ${error.error.msg}`)
      )
  }
}
