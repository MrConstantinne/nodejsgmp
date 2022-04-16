import "reflect-metadata";
import { GroupModel, UserGroup } from "@prisma/client";
import { inject, injectable } from "inversify";

import { ConfigServiceInterface } from "../config/config.service.interface";
// eslint-disable-next-line import/order
import { TYPES } from "../types";

// eslint-disable-next-line import/namespace
import { UsersRepositoryInterface } from "../users/interfaces/users.repository.interface";

import { GroupDto } from "./dto/group.dto";
import { GroupEntity } from "./group.entity";
import { GroupRepositoryInterface } from "./interface/group.repository.interface";
// eslint-disable-next-line import/namespace
import { GroupServiceInterface } from "./interface/group.service.interface";

@injectable()
export class GroupService implements GroupServiceInterface {
  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(TYPES.GroupsRepository)
    private groupsRepository: GroupRepositoryInterface,
    @inject(TYPES.UsersRepository)
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async add({ name, permission }: GroupDto): Promise<GroupModel> {
    const group = new GroupEntity(name, permission);
    group.setId();
    return this.groupsRepository.create(group);
  }

  public async getAllGroups(): Promise<GroupModel[] | null> {
    return this.groupsRepository.findAll();
  }

  public async findById(id: string): Promise<GroupModel | null> {
    return this.groupsRepository.findById(id);
  }

  public async update(
    id: string,
    { name, permission }: Partial<GroupDto>,
  ): Promise<GroupModel | null> {
    const existedGroup = await this.findById(id);
    if (!existedGroup) {
      return null;
    }

    const group = new GroupEntity(
      name ? name : existedGroup.name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      permission ? existedGroup.permission : permission,
      existedGroup.id,
    );

    return this.groupsRepository.update(group);
  }

  public async remove(id: string): Promise<GroupModel | null> {
    const existedGroup = await this.findById(id);
    if (!existedGroup) {
      return null;
    }
    return this.groupsRepository.remove(id);
  }

  public async addToGroup(
    userId: string,
    groupId: string,
  ): Promise<UserGroup | null> {
    const existedGroup = await this.findById(groupId);
    const existedUsers = await this.usersRepository.findById(userId);
    if (!existedGroup && !existedUsers) {
      return null;
    }
    return this.groupsRepository.add(userId, groupId);
  }
}
