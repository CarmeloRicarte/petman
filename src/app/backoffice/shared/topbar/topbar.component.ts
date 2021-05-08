import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/services/service.index';
import { PagesComponent } from '../../pages/pages.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy {

  subscription!: Subscription;

  items!: MenuItem[];

  constructor(public app: AppComponent, public appMain: PagesComponent, private usuarioService: UsuarioService) { }

  cerrarSesion(): void {
    this.usuarioService.logout();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
