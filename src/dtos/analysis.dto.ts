export class AnalysisResModel {
   id: number
   text: string;
   score: number;
   timestamp: string;

   static createResponse(data: any): AnalysisResModel {
      return {
         id: data.id,
         text: data.text,
         score: data.score,
         timestamp: data.timestamp
      }
   }
}