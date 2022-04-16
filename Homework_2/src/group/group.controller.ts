import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "../common/base.controller";
import { LoggingMiddleware } from "../common/logging.middleware";
import { HttpError } from "../errors/http-error.class";
import { LoggerInterface } from "../logger/logger.interface";
import { TYPES } from "../types";

import { GroupDto } from "./dto/group.dto";
import { UserGroupDto } from "./dto/userGroup.dto";
import { GroupService } from "./group.service";
import { GroupControllerInterface } from "./interface/group.controller.interface";
import {AuthGuard} from "../common/auth.guard";

@injectable()
export class GroupController
  extends BaseController
  implements GroupControllerInterface
{
  constructor(
    @inject(TYPES.GroupsService) private groupsService: GroupService,
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/",
        method: "get",
        func: this.list,
        service: "GROUP",
        middlewares: [new LoggingMiddleware(loggerService), new AuthGuard()],
      },
      {
        path: "/",
        method: "post",
        func: this.create,
        service: "GROUP",
        middlewares: [new LoggingMiddleware(loggerService), new AuthGuard()],
      },
      {
        path: "/:id",
        method: "get",
        func: this.findById,
        service: "GROUP",
        middlewares: [new LoggingMiddleware(loggerService), new AuthGuard()],
      },
      {
        path: "/:id",
        method: "patch",
        func: this.update,
        service: "GROUP",
        middlewares: [new LoggingMiddleware(loggerService), new AuthGuard()],
      },
      {
        path: "/:id",
        method: "delete",
        func: this.delete,
        service: "GROUP",
        middlewares: [new LoggingMiddleware(loggerService), new AuthGuard()],
      },
      {
        path: "/add",
        method: "post",
        func: this.addUsersToGroup,
        service: "GROUP",
        middlewares: [new LoggingMiddleware(loggerService), new AuthGuard()],
      },
    ]);
  }

  public async create(
    // eslint-disable-next-line @typescript-eslint/ban-types
    { body, method }: Request<{}, {}, GroupDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const result = await this.groupsService.add(body);
    if (!result) {
      next(
        new HttpError(
          404,
          "Group not found",
          `Method: ${method}, Args: ${JSON.stringify(body)}`,
        ),
      );
    }
    this.created(res, { id: result.id });
  }

  public async list(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const group = await this.groupsService.getAllGroups();
    group
      ? this.ok(res, group)
      : next(
          new HttpError(
            404,
            "Group not found",
            `Method: ${req.method}, Args: ${JSON.stringify(req.body)}`,
          ),
        );
  }

  public async findById(
    { params, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const group = await this.groupsService.findById(params.id);
    group
      ? this.ok(res, group)
      : next(
          new HttpError(
            404,
            "Group not found",
            `Method: ${method}, Args: ${JSON.stringify(params)}`,
          ),
        );
  }

  public async update(
    { params, body, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const group = await this.groupsService.update(params.id, body);
    group
      ? this.ok(res, group)
      : next(
          new HttpError(
            404,
            "Group not found",
            `Method: ${method}, Args: ${JSON.stringify(body)} ${JSON.stringify(
              params,
            )}`,
          ),
        );
  }

  public async delete(
    { params, method }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const group = await this.groupsService.remove(params.id);
    group
      ? this.ok(res, group)
      : next(
          new HttpError(
            404,
            "Group not found",
            `Method: ${method}, Args: ${JSON.stringify(params)}`,
          ),
        );
  }

  public async addUsersToGroup(
    // eslint-disable-next-line @typescript-eslint/ban-types
    { body, method }: Request<{}, {}, UserGroupDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const group = await this.groupsService.addToGroup(
      body.userId,
      body.groupId,
    );
    group
      ? this.ok(res, group)
      : next(
          new HttpError(
            404,
            "Group or User not found",
            `Method: ${method}, Args: ${JSON.stringify(body)}`,
          ),
        );
  }
}
