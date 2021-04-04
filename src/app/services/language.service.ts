import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) { }

  setInitialAppLanguage(): void {
    const language = this.translate.getBrowserLang();

    language ?
      this.translate.use(language) : this.translate.use('es');
  }

}
