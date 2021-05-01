import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrollTopModule } from 'primeng/scrolltop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';

import { ReviewsService } from '../../../services/corporative-page/reviews.service';

import { RangePipe } from 'src/app/pipes/range.pipe';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LanguageService } from '../../../services/language.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutComponent } from '../../components/about/about.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ScrollTopModule,
    AnimateOnScrollModule.forRoot(),
    ProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RangePipe,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ReviewsComponent,
    ServicesComponent,
    ContactComponent,
    CarouselComponent
  ],
  providers: [LanguageService, ReviewsService],
  exports: [HomeComponent]
})
export class HomeModule { }
