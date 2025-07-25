export interface Review {
  text: string;
  rating: number;
}

export interface SentimentResult {
  text: string;
  rating: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
}