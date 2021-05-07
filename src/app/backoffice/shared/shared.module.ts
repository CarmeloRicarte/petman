import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    TopbarComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    InputTextModule
  ],
  exports: [
    TopbarComponent,
    MenuComponent,
    FooterComponent
  ]
})
export class SharedModule { }
