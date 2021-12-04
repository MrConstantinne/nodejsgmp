import { NextFunction, Request, Response } from "express";

export interface GroupControllerInterface {
  create: (req: Request, res: Response, next: NextFunction) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
  findById: (req: Request, res: Response, next: NextFunction) => void;
  list: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
  addUsersToGroup: (req: Request, res: Response, next: NextFunction) => void;
}
