import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "../common/base.controller";
import { LoggingMiddleware } from "../common/logging.middleware";
import { ValidateMiddleware } from "../common/validate.middleware";
import { HttpError } from "../errors/http-error.class";
import { LoggerInterface } from "../logger/logger.interface";
import { TYPES } from "../types";

import { UserUpdateDto } from "./dto/user-update.dto";
import { UserDto } from "./dto/user.dto";
import { UsersControllerInterface } from "./interfaces/users.controller.interface";
import { UsersService } from "./users.service";

@injectable()
export class UsersController
  extends BaseController
  implements UsersControllerInterface
{
  constructor(
    @inject(TYPES.UsersService) private usersService: UsersService,
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/",
        method: "get",
        func: this.list,
        service: "USERS",
        middlewares: [new LoggingMiddleware(loggerService)],
      },
      {
        path: "/",
        method: "post",
        service: "USERS",
        func: this.create,
        middlewares: [
          new LoggingMiddleware(loggerService),
          new ValidateMiddleware(UserDto),
        ],
      },
      {
        path: "/:id",
        method: "get",
        func: this.findById,
        service: "USERS",
        middlewares: [new LoggingMiddleware(loggerService)],
      },
      {
        path: "/:id",
        method: "patch",
        func: this.update,
        service: "USERS",
        middlewares: [
          new ValidateMiddleware(UserUpdateDto),
          new LoggingMiddleware(loggerService),
        ],
      },
      {
        path: "/:id",
        method: "delete",
        func: this.delete,
        service: "USERS",
        middlewares: [new LoggingMiddleware(loggerService)],
      },
    ]);
  }

  public async create(
    // eslint-disable-next-line @typescript-eslint/ban-types
    { body, method }: Request<{}, {}, UserDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const result = await this.usersService.add(body);
    if (!result) {
      next(
        new HttpError(
          404,
          "Users not found",
          `Method: ${method}, Args: ${JSON.stringify(body)}`
        ),
      );
    }
    this.created(res, { id: result.id, login: result.login });
  }

  public async list(
    { body, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user = await this.usersService.getAutoSuggestUsers(body);
    user
      ? this.ok(res, user)
      : next(
          new HttpError(
            404,
            "Users not found",
            `Method: ${method}, Args: ${JSON.stringify(body)}`,
          ),
        );
  }

  public async findById(
    { params, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user = await this.usersService.findById(params.id);
    user
      ? this.ok(res, user)
      : next(
          new HttpError(
            404,
            "Users not found",
            `Method: ${method}, Args: ${JSON.stringify(params)}`,
          ),
        );
  }

  public async update(
    { params, body, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user = await this.usersService.update(params.id, body);
    user
      ? this.ok(res, user)
      : next(
          new HttpError(
            404,
            "Users not found",
            `Method: ${method} Args: ${JSON.stringify(params)} ${JSON.stringify(
              body,
            )}`,
          ),
        );
  }

  public async delete(
    { params, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user = await this.usersService.remove(params.id);
    user
      ? this.ok(res, user)
      : next(
          new HttpError(
            404,
            "Users not found",
            `Method: ${method} Args: ${JSON.stringify(params)}`,
          ),
        );
  }
}
