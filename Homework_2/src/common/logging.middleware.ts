import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { LoggerInterface } from "../logger/logger.interface";
import { TYPES } from "../types";

import { MiddlewareInterface } from "./middleware.interface";

@injectable()
export class LoggingMiddleware implements MiddlewareInterface {
  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    this.loggerService.log(`-------REQUEST-------`);
    this.loggerService.log(`[ Method ]: ${req.method}`);
    this.loggerService.log(`[ Path ]: ${req.path}`);
    if (Object.entries(req.params).length !== 0) {
      this.loggerService.log(`[ Params ]: ${JSON.stringify(req.params)}`);
    }
    if (Object.entries(req.body).length !== 0) {
      this.loggerService.log(`[ Body ]: ${JSON.stringify(req.body)}`);
    }
    this.loggerService.log(`---------------------`);
    next();
  }
}
