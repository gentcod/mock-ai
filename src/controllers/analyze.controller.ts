import { Request, Response, NextFunction } from 'express';
import { sendApiResponse, sendInternalErrorResponse} from '../utils/apiResponse';
import { SentimentService } from '../services/analyze.services';

export class AnalyzeController {
   public async analyzeText(req: Request, res: Response, next: NextFunction) {
      try {
         const result = await new SentimentService().analyze(req.email, req.body.text)
         
         return sendApiResponse(res, {
            status: result.status,
            message: result.message,
            data: result.data,
         });
      }
      catch (err) {
         sendInternalErrorResponse(res, err);
         next(err);
      }
   };

   public async getSingleResult(req: Request, res: Response, next: NextFunction) {
      try {
         const resultId = Number(req.params.id);
         const result = await new SentimentService().getSingleResult(req.email,resultId)
         
         return sendApiResponse(res, {
            status: result.status,
            message: result.message,
            data: result.data,
         });
      }
      catch (err) {
         sendInternalErrorResponse(res, err);
         next(err);
      }
   };

   public async getMultipleResults(req: Request, res: Response, next: NextFunction) {
      try {
         const result = await new SentimentService().getMultipleResult(req.email)
         
         return sendApiResponse(res, {
            status: result.status,
            message: result.message,
            data: result.data,
         });
      }
      catch (err) {
         sendInternalErrorResponse(res, err);
         next(err);
      }
   };
}
