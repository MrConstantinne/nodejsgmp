import "reflect-metadata";
import { Router, Response } from "express";
import { injectable } from "inversify";

import { LoggerInterface } from "../logger/logger.interface";

import { Route } from "./route.interfase";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerInterface) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): Response {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  public created<T>(res: Response, message: T): Response {
    return this.send<T>(res, 201, message);
  }

  protected bindRoutes(routes: Route[]): void {
    for (const route of routes) {
      this.logger.log(`[ ${route.service} ] ${route.method}${route.path}`);
      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
