import { SentimentService } from "../services/analyze.services";

describe('SentimentAnalyzer', () => {
   test('should return high score for positive text', () => {
      const text = 'This is amazing and wonderful';
      const score = new SentimentService().testScore(text);
      expect(score).toBeGreaterThan(0.5);
   });

   test('should return low score for negative text', () => {
      const text = 'This is terrible and horrible';
      const score = new SentimentService().testScore(text);
      expect(score).toBeLessThan(0.5);
   });

   test('should return neutral score for neutral text', () => {
      const text = 'This is a regular text';
      const score = new SentimentService().testScore(text);
      expect(score).toBe(0.5);
   });

   test('should throw error for invalid input', () => {
      expect(() => new SentimentService().testScore(null)).toThrow();
      expect(() => new SentimentService().testScore(undefined)).toThrow();
   });
});