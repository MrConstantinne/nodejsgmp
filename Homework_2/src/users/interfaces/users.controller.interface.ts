import { NextFunction, Request, Response } from "express";

export interface UsersControllerInterface {
  create: (req: Request, res: Response, next: NextFunction) => void;
  list: (req: Request, res: Response, next: NextFunction) => void;
  findById: (req: Request, res: Response, next: NextFunction) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
  login: (req: Request, res: Response, next: NextFunction) => void;
}
