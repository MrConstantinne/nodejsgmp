import "reflect-metadata";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "../common/base.controller";
import { TYPES } from "../types";

// eslint-disable-next-line import/namespace
import { GroupDto } from "./dto/group.dto";
import { UserGroupDto } from "./dto/userGroup.dto";
import { GroupService } from "./group.service";
import { GroupControllerInterface } from "./interface/group.controller.interface";

@injectable()
export class GroupController
  extends BaseController
  implements GroupControllerInterface
{
  constructor(
    @inject(TYPES.GroupsService) private groupsService: GroupService,
  ) {
    super();
    this.bindRoutes([
      { path: "/", method: "get", func: this.list },
      {
        path: "/",
        method: "post",
        func: this.create,
      },
      { path: "/:id", method: "get", func: this.findById },
      {
        path: "/:id",
        method: "patch",
        func: this.update,
      },
      { path: "/:id", method: "delete", func: this.delete },
      { path: "/add", method: "post", func: this.addUsersToGroup },
    ]);
  }

  public async create(
    // eslint-disable-next-line @typescript-eslint/ban-types
    { body }: Request<{}, {}, GroupDto>,
    res: Response,
  ): Promise<Response | void> {
    const result = await this.groupsService.add(body);
    if (!result) {
      throw new Error("NOT_FOUND");
    }
    this.created(res, { id: result.id });
  }

  public async list(req: Request, res: Response): Promise<Response | void> {
    const group = await this.groupsService.getAllGroups();
    group
      ? this.ok(res, group)
      : res.status(404).json({ message: "Group not found" });
  }

  public async findById(
    { params }: Request,
    res: Response,
  ): Promise<Response | void> {
    const group = await this.groupsService.findById(params.id);
    group
      ? this.ok(res, group)
      : res.status(404).json({ message: "Group not found" });
  }

  public async update(
    { params, body }: Request,
    res: Response,
  ): Promise<Response | void> {
    const group = await this.groupsService.update(params.id, body);
    group
      ? this.ok(res, group)
      : res.status(404).json({ message: "Group not found" });
  }

  public async delete(
    { params }: Request,
    res: Response,
  ): Promise<Response | void> {
    const group = await this.groupsService.remove(params.id);
    group
      ? this.ok(res, group)
      : res.status(404).json({ message: "Group not found" });
  }

  public async addUsersToGroup(
    // eslint-disable-next-line @typescript-eslint/ban-types
    { body }: Request<{}, {}, UserGroupDto>,
    res: Response,
  ): Promise<Response | void> {
    const group = await this.groupsService.addToGroup(
      body.userId,
      body.groupId,
    );
    group
      ? this.ok(res, group)
      : res.status(404).json({ message: "Users or Group not found" });
  }
}
