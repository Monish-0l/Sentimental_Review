import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review, SentimentResult } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {
  private positiveWords = new Set([
    'good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful',
    'fantastic', 'amazing', 'outstanding', 'perfect', 'best', 'brilliant'
  ]);

  private negativeWords = new Set([
    'bad', 'poor', 'terrible', 'awful', 'horrible', 'hate', 'worst',
    'disappointing', 'disappointed', 'useless', 'waste', 'horrible'
  ]);

  analyzeSentiment(review: Review): Observable<SentimentResult> {
    const words = review.text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (this.positiveWords.has(word)) positiveCount++;
      if (this.negativeWords.has(word)) negativeCount++;
    });

    const total = positiveCount + negativeCount || 1;
    const sentiment = this.determineSentiment(positiveCount, negativeCount, review.rating);
    const confidence = Math.max(positiveCount, negativeCount) / total;

    return of({
      text: review.text,
      rating: review.rating,
      sentiment,
      confidence: parseFloat(confidence.toFixed(2))
    });
  }

  private determineSentiment(
    positiveCount: number,
    negativeCount: number,
    rating: number
  ): 'Positive' | 'Negative' | 'Neutral' {
    // Consider both text sentiment and rating
    const textScore = positiveCount - negativeCount;
    const ratingScore = rating - 3; // Normalize rating around neutral (3)
    
    const combinedScore = textScore + ratingScore;
    
    if (combinedScore > 0) return 'Positive';
    if (combinedScore < 0) return 'Negative';
    return 'Neutral';
  }
}