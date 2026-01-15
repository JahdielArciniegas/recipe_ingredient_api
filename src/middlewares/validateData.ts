import { BadRequestError } from "../utils/errors.js";

export const validate = (schema: any) => {
  return (req: any, res: any, next: any) => {
    try {
      const value = schema.parse({
        body: req.body,
      });
      req.body = value.body;
      next();
    } catch (error: any) {
      next(new BadRequestError(error));
    }
  };
};
