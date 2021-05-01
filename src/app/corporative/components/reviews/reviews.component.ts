import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/corporative-page/reviews.service';
import { ReviewGoogleMaps } from 'src/app/models/corporative-page/reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: ReviewGoogleMaps[] = [];
  loaded = false;
  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): any {
    this.reviewsService.getReviews().subscribe({
      next: (reviewsObtenidas: ReviewGoogleMaps[]) => {
        this.reviews = reviewsObtenidas;
        this.loaded = true;
      },
      error: err => console.log(err)
    });
  }
}
