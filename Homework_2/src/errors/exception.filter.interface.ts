import { NextFunction, Request, Response } from "express";

import { HttpError } from "./http-error.class";

export interface ExceptionFilterInterface {
  catch: (
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
