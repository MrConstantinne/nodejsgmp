import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { LoggerInterface } from "../logger/logger.interface";
import { TYPES } from "../types";

import { ExceptionFilterInterface } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
  ) {}

  catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error instanceof HttpError) {
      this.loggerService.error(
        `[${error.context}] Error ${error.statusCode}: ${error.message}`,
      );
      res.status(error.statusCode).send({ err: error.message });
    } else {
      this.loggerService.error(`${error.message}`);
      res.status(500).send({ err: error.message });
    }
  }
}
