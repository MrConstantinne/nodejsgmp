import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { MiddlewareInterface } from "./middleware.interface";

export class AuthMiddleware implements MiddlewareInterface {
  constructor(private secret: string) {}
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      verify(
        req.headers.authorization.split(" ")[1],
        this.secret,
        (err, payload) => {
          if (err) {
            next();
          } else if (payload) {
            req.user = payload.login;
            next();
          }
        },
      );
    } else {
      next();
    }
  }
}
