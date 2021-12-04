import { GroupModel, UserGroup } from "@prisma/client";
import { inject, injectable } from "inversify";

import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../types";

import { GroupEntity } from "./group.entity";
import { GroupRepositoryInterface } from "./interface/group.repository.interface";

@injectable()
export class GroupRepository implements GroupRepositoryInterface {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {}
  async create({ id, name, permission }: GroupEntity): Promise<GroupModel> {
    return this.prismaService.client.groupModel.create({
      data: { id, name, permission },
    });
  }

  async findById(id: string): Promise<GroupModel | null> {
    return this.prismaService.client.groupModel.findUnique({ where: { id } });
  }

  async update({
    id,
    name,
    permission,
  }: GroupEntity): Promise<GroupModel | null> {
    return this.prismaService.client.groupModel.update({
      where: { id },
      data: { name, permission },
    });
  }

  async remove(id: string): Promise<GroupModel | null> {
    return this.prismaService.client.groupModel.delete({ where: { id } });
  }

  async findAll(): Promise<GroupModel[] | []> {
    return this.prismaService.client.groupModel.findMany();
  }

  async add(userId: string, groupId: string): Promise<UserGroup | null> {
    return this.prismaService.client.userGroup.create({
      data: { userId, groupId },
    });
  }
}
