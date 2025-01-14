import express from 'express';
import analyzeRouter from './analyze.routes';
import authRouter from './auth.routes';

export const indexRouter = express.Router()

indexRouter.use('/api/v1', analyzeRouter)
indexRouter.use('/api/v1/user', authRouter)

export default indexRouter;