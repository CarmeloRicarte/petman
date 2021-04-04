import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'petman';

  constructor(private primengConfig: PrimeNGConfig, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.setInitialAppLanguage();
    this.primengConfig.ripple = true; // animaciones de primeNG
  }


}
