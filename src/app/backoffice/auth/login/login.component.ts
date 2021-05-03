import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/models/backoffice/usuario.model';
import { LoginService } from 'src/app/services/backoffice/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required)
    })
  }

  login() {
    let usuario: Usuario = new Usuario(
      '',
      this.loginForm.value.usuario,
      this.loginForm.value.contraseña
    );

    this.loginService.login(usuario)
      .subscribe(() => {
        this.toastr.success('Sesión iniciada correctamente');
        this.router.navigate(['/dashboard']);
      }, (err: any) => {
        this.toastr.error(`Error al iniciar sesión: ${err.error.msg}`);
      });
  }
}
