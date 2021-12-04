import { GroupModel, UserGroup } from "@prisma/client";

// eslint-disable-next-line import/namespace
import { GroupDto } from "../dto/group.dto";

export class GroupServiceInterface {
  add: (dto: GroupDto) => Promise<GroupModel>;
  getAllGroups: () => Promise<GroupModel[] | null>;
  findById: (id: string) => Promise<GroupModel | null>;
  update: (id: string, dto: Partial<GroupDto>) => Promise<GroupModel | null>;
  remove: (id: string) => Promise<GroupModel | null>;
  addToGroup: (userId: string, groupId: string) => Promise<UserGroup | null>;
}
