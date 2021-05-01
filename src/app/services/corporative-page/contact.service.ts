import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactForm } from 'src/app/models/corporative-page/contactForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendEmail(datos: ContactForm): Promise<any> {
    return this.http.post(`${environment.urlServicios}/contact`, datos).toPromise();
  }
}
