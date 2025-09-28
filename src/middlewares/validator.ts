import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export default class RequestValidator {
  static validate = <T>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body);
      const errors = await validate(convertedObject as object);

      if (errors.length > 0) {
        const rawErrors: string[] = [];
        for (const errorItem of errors) {
          rawErrors.push(...Object.values(errorItem.constraints ?? {}));
        }

        const validationErrorText = "Request validation failed!";
        console.log("error found!", rawErrors);
        res
          .status(400)
          .send({ message: validationErrorText, errors: rawErrors });
        return;
      }
      next();
    };
  };
}
