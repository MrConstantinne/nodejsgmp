import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { MiddlewareInterface } from "./middleware.interface";

export class ValidateMiddleware implements MiddlewareInterface {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    private classToValidate: ClassConstructor<object>,
  ) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        res.status(400).send(errors);
      } else {
        next();
      }
    });
  }
}
