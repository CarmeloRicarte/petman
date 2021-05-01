import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewGoogleMaps } from 'src/app/models/corporative-page/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get<ReviewGoogleMaps>(`${environment.urlServicios}/reviews`);
  }
}
