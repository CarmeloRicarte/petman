import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/service.index';
import { PagesComponent } from '../../pages/pages.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu = [];

  constructor(public menuService: MenuService, public appMain: PagesComponent) { }

  ngOnInit(): void {
    this.menu = this.menuService.cargarMenu();
  }
}
