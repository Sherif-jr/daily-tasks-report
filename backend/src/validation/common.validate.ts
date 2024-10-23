import Joi from "joi";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const paramsWithIdSchema = Joi.object({
  id: Joi.string().regex(objectIdRegex).required().messages({
    "string.pattern.base": "Invalid id format",
    "any.required": "Id is required",
  }),
});

export { paramsWithIdSchema };
