import { SentimentScripts } from "../scripts/sentiment.scripts";
import { db } from "../db";
import { IAnalysis } from "../models/Analysis";
import { AnalysisResModel } from "../dtos/analysis.dto";
const scripts = new SentimentScripts()

export class SentimentService {
   positiveWords: string[];
   negativeWords: string[];
   constructor() {
      this.positiveWords = ['good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful', 'amazing'];
      this.negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'poor', 'disappointed'];
   }

   private _getScore(text: string) {
      const words = text.toLowerCase().split(/\s+/);
      let score = 0.5;

      const positiveCount = words.filter(word => this.positiveWords.includes(word)).length;
      const negativeCount = words.filter(word => this.negativeWords.includes(word)).length;

      if (positiveCount || negativeCount) {
         score = (positiveCount) / (positiveCount + negativeCount) || 0;
      }

      return Math.ceil(Math.max(0, Math.min(1, score)) * 100) / 100;
   }

   public testScore(text: string) {
      return this._getScore(text);
   }

   public async analyze(email: string, text: string) {
      const data: IAnalysis = {
         user_email: email,
         text: text,
         score: this._getScore(text),
         timestamp: new Date().toISOString(),
      }
      const existing = await db.get(scripts.checkExisting, [text, email]);
      if (existing) {
         return {
            status: 400,
            message: 'Text has been previously analyzed.'
         }
      }

      const result = await db.run(
         scripts.insertResult,
         [data.user_email, data.text, data.score, data.timestamp]
      );

      const resultData = await db.get(scripts.getSingleResult, [result.lastID, email]);
      return {
         status: 200,
         message: 'Text analyzed successfully.',
         data: resultData,
      }
   }

   public async getSingleResult(email: string, id: number) {
      const result = await db.get(scripts.getSingleResult, [id, email]);
      if (!result) {
         return {
            status: 404,
            message: 'Sentiment result not found.'
         }
      }

      const response = AnalysisResModel.createResponse(result);

      return {
         status: 200,
         message: 'Sentiment result fetch successfully.',
         data: response,
      }
   }

   public async getMultipleResult(email: string) {
      const result = await db.getMultipe(scripts.getMultipleResults, [email]);

      const response = result.map(el => AnalysisResModel.createResponse(el));
      return {
         status: 200,
         message: 'Sentiment result(s) fetch successfully.',
         data: response,
      }
   }
};
