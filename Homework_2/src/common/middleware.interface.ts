import { Request, Response, NextFunction } from "express";

export interface MiddlewareInterface {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}
