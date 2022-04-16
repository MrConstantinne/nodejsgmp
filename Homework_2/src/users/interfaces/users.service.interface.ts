import { UserModel } from "@prisma/client";

import { UserListDto } from "../dto/user-list.dto";
import { UserLoginDto } from "../dto/user-login.dto";
import { UserDto } from "../dto/user.dto";

export class UsersServiceInterface {
  add: (dto: UserDto) => Promise<UserModel>;
  getAutoSuggestUsers: (dto: UserListDto) => Promise<UserModel[] | null>;
  findById: (id: string) => Promise<UserModel | null>;
  update: (id: string, dto: Partial<UserDto>) => Promise<UserModel | null>;
  remove: (id: string) => Promise<UserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
