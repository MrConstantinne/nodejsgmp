import { UserModel } from "@prisma/client";

import { UsersEntity } from "../users.entity";

export interface UsersRepositoryInterface {
  create: (user: UsersEntity) => Promise<UserModel>;
  findById: (id: string) => Promise<UserModel | null>;
  update: (user: UsersEntity) => Promise<UserModel | null>;
  remove: (id: string) => Promise<UserModel | null>;
  findAll: () => Promise<UserModel[] | []>;
  find: (login: string) => Promise<UserModel | null>;
}
