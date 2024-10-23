import tryCatch from "../helpers/tryCatch";

export function joiValidateBody(schema: any) {
  return tryCatch<any, any, any, any>(async (req, res, next) => {
    // console.log(req.body)
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  });
}
export function joiValidateParams(schema: any) {
  return tryCatch<any>(async (req, res, next) => {
    await schema.validateAsync(req.params, { abortEarly: false });
    next();
  });
}
export function joiValidateQuery(schema: any) {
  return tryCatch<any>(async (req, res, next) => {
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  });
}
