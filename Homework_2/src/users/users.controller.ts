import "reflect-metadata";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "../common/base.controller";
import { ValidateMiddleware } from "../common/validate.middleware";
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
  constructor(@inject(TYPES.UsersService) private usersService: UsersService) {
    super();
    this.bindRoutes([
      { path: "/", method: "get", func: this.list },
      {
        path: "/",
        method: "post",
        func: this.create,
        middlewares: [new ValidateMiddleware(UserDto)],
      },
      { path: "/:id", method: "get", func: this.findById },
      {
        path: "/:id",
        method: "patch",
        func: this.update,
        middlewares: [new ValidateMiddleware(UserUpdateDto)],
      },
      { path: "/:id", method: "delete", func: this.delete },
    ]);
  }

  public async create(
    // eslint-disable-next-line @typescript-eslint/ban-types
    { body }: Request<{}, {}, UserDto>,
    res: Response,
  ): Promise<Response | void> {
    const result = await this.usersService.add(body);
    if (!result) {
      throw new Error("NOT_FOUND");
    }
    this.created(res, { id: result.id, login: result.login });
  }

  public async list(
    { body }: Request,
    res: Response,
  ): Promise<Response | void> {
    const user = await this.usersService.getAutoSuggestUsers(body);
    user
      ? this.ok(res, user)
      : res.status(404).json({ message: "Users not found" });
  }

  public async findById(
    { params }: Request,
    res: Response,
  ): Promise<Response | void> {
    const user = await this.usersService.findById(params.id);
    user
      ? this.ok(res, user)
      : res.status(404).json({ message: "User not found" });
  }

  public async update(
    { params, body }: Request,
    res: Response,
  ): Promise<Response | void> {
    const user = await this.usersService.update(params.id, body);
    user
      ? this.ok(res, user)
      : res.status(404).json({ message: "User not found" });
  }

  public async delete(
    { params }: Request,
    res: Response,
  ): Promise<Response | void> {
    const user = await this.usersService.remove(params.id);
    user
      ? this.ok(res, user)
      : res.status(404).json({ message: "User not found" });
  }
}
