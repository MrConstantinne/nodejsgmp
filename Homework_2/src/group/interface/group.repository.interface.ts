import { GroupModel, UserGroup } from "@prisma/client";

import { GroupEntity } from "../group.entity";

export interface GroupRepositoryInterface {
  create: (group: GroupEntity) => Promise<GroupModel>;
  findById: (id: string) => Promise<GroupModel | null>;
  update: (group: GroupEntity) => Promise<GroupModel | null>;
  remove: (id: string) => Promise<GroupModel | null>;
  findAll: () => Promise<GroupModel[] | []>;
  add: (userId: string, groupId: string) => Promise<UserGroup | null>;
}
