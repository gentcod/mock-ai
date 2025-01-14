import express from 'express';
import { AnalyzeController } from '../controllers/analyze.controller';
import { authMid } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateReqMiddleware';
import { AnalyzeValidation } from '../validations/analyze.validation';

const analyzeRouter = express.Router();
const analyzeController = new AnalyzeController();

analyzeRouter.route('/analyze').post(
   authMid,
   validateRequest(AnalyzeValidation),
   analyzeController.analyzeText,
);

analyzeRouter.route('/results').get(
   authMid,
   analyzeController.getMultipleResults,
);

analyzeRouter.route('/results/:id').get(
   authMid,
   analyzeController.getSingleResult,
);

export default analyzeRouter;