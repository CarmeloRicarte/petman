import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { PagesComponent } from '../../pages/pages.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy {

  subscription!: Subscription;

  items!: MenuItem[];

  constructor(public app: AppComponent, public appMain: PagesComponent) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
