import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LanguageService } from '../../../services/language.service';
import { FooterComponent } from '../../components/footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [HomeComponent, HeaderComponent, FooterComponent],
  providers: [LanguageService],
  exports: [HomeComponent]
})
export class HomeModule { }
