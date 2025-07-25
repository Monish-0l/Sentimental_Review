import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { SentimentService } from '../../services/sentiment.service';
import { SentimentResult } from '../../models/review.model';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent],
  template: `
    <div class="review-container">
      <div class="form-group">
        <label for="review">Your Review:</label>
        <textarea
          id="review"
          [(ngModel)]="reviewText"
          class="review-input"
          rows="5"
          placeholder="Write your review here..."
        ></textarea>
      </div>

      <div class="form-group">
        <label>Rating:</label>
        <app-star-rating [(rating)]="rating"></app-star-rating>
      </div>

      <button (click)="submitReview()" class="submit-btn">
        Analyze Review
      </button>

      <div *ngIf="result" class="result-container">
        <h3>Analysis Result:</h3>
        <div class="result-card" [ngClass]="result.sentiment.toLowerCase()">
          <p class="sentiment">Sentiment: {{ result.sentiment }}</p>
          <p class="confidence">Confidence: {{ (result.confidence * 100).toFixed(0) }}%</p>
          <p class="rating">Rating: {{ result.rating }} / 5</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .review-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .review-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      resize: vertical;
    }

    .submit-btn {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
    }

    .submit-btn:hover {
      background: #45a049;
    }

    .result-container {
      margin-top: 2rem;
    }

    .result-card {
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }

    .result-card.positive {
      background: #e8f5e9;
      border-left: 4px solid #4CAF50;
    }

    .result-card.negative {
      background: #ffebee;
      border-left: 4px solid #f44336;
    }

    .result-card.neutral {
      background: #f5f5f5;
      border-left: 4px solid #9e9e9e;
    }

    .sentiment {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .confidence, .rating {
      color: #666;
    }
  `]
})
export class ReviewFormComponent {
  reviewText = '';
  rating = 0;
  result: SentimentResult | null = null;

  constructor(private sentimentService: SentimentService) {}

  submitReview() {
    if (!this.reviewText.trim() || !this.rating) {
      alert('Please provide both a review and rating');
      return;
    }

    this.sentimentService
      .analyzeSentiment({ text: this.reviewText, rating: this.rating })
      .subscribe(result => {
        this.result = result;
      });
  }
}