import Joi from "joi";

export const AnalyzeValidation = Joi.object({
   text: Joi.string().min(1).trim().required(),
});