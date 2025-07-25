import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <span
        *ngFor="let star of stars; let i = index"
        (click)="onStarClick(i + 1)"
        [class.filled]="i < rating"
        class="star"
      >
        ★
      </span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: inline-block;
    }
    .star {
      font-size: 24px;
      color: #ddd;
      cursor: pointer;
      transition: color 0.2s;
    }
    .star:hover,
    .star.filled {
      color: #ffd700;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();
  
  stars = new Array(5);

  onStarClick(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(rating);
  }
}