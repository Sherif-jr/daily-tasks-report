import Joi from "joi";
import Task from "../interfaces/task.interface";

const taskSchema = Joi.object<Task>({
  title: Joi.string().required().messages({
    "any.required": "The task title is required.",
    "string.base": "The task title must be a valid string.",
  }),
  description: Joi.string().required().messages({
    "any.required": "The task description is required.",
    "string.base": "The task description must be a valid string.",
  }),
  from: Joi.date().required().messages({
    "any.required": "The start date (from) is required.",
    "date.base": "The start date (from) must be a valid date.",
  }),
  to: Joi.date()
    .required()
    .min(Joi.ref("from"))
    .max(
      Joi.ref("from", {
        adjust: (from: Date) => new Date(from.getTime() + 8 * 60 * 60 * 1000),
      })
    )
    .messages({
      "any.required": "The end date (to) is required.",
      "date.base": "The end date (to) must be a valid date.",
      "date.min": "The end date (to) must be after the start date (from).",
      "date.max":
        "The end date (to) must not be more than 8 hours after the start date (from).",
    }),
  employee: Joi.string()
    .required()
    // .required()
    .messages({
      "any.required": "The employee ID is required.",
      "string.base": "The employee ID must be a valid string.",
    }),
});

const taskUpdateSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "The task ID is required.",
    "string.base": "The task ID must be a valid string.",
  }),
  title: Joi.string().optional().messages({
    "string.base": "The task title must be a valid string.",
  }),
  description: Joi.string().optional().messages({
    "string.base": "The task description must be a valid string.",
  }),
  from: Joi.date().optional().messages({
    "date.base": "The start date (from) must be a valid date.",
  }),
  to: Joi.date()
    .optional()
    .min(Joi.ref("from"))
    .max(
      Joi.ref("from", {
        adjust: (from: Date) => new Date(from.getTime() + 8 * 60 * 60 * 1000),
      })
    )
    .messages({
      "date.base": "The end date (to) must be a valid date.",
      "date.min": "The end date (to) must be after the start date (from).",
      "date.max":
        "The end date (to) must not be more than 8 hours after the start date (from).",
    }),
});
export { taskSchema, taskUpdateSchema };
