import { Request, Response, NextFunction, Router } from "express";

import { MiddlewareInterface } from "./middleware.interface";

export interface Route {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  service: "USERS" | "GROUP";
  method: keyof Pick<Router, "get" | "post" | "put" | "delete" | "patch">;
  middlewares?: MiddlewareInterface[];
}
