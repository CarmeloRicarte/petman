import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TopbarComponent } from './topbar/topbar.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';
import { MenuitemComponent } from './menu/menuitem.component';



@NgModule({
  declarations: [
    TopbarComponent,
    MenuComponent,
    FooterComponent,
    MenuitemComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [
    TopbarComponent,
    MenuComponent,
    FooterComponent
  ]
})
export class SharedModule { }
