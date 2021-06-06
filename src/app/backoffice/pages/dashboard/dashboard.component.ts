import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  nombreUsuario = '';
  constructor() {}

  ngOnInit(): void {
    this.nombreUsuario = this.getNombreUsuario();
  }

  getNombreUsuario(): string {
    const usuario = JSON.parse(localStorage.getItem('usuario') as string);
    return JSON.stringify(usuario.nombre).replace(/['"]+/g, '');
  }
}
