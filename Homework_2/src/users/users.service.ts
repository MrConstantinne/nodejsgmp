import "reflect-metadata";
import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";

import { ConfigServiceInterface } from "../config/config.service.interface";
import { TYPES } from "../types";

import { UserListDto } from "./dto/user-list.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserDto } from "./dto/user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { UsersServiceInterface } from "./interfaces/users.service.interface";
import { UsersEntity } from "./users.entity";

@injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(TYPES.UsersRepository)
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async add({ login, password, age }: UserDto): Promise<UserModel> {
    const user = new UsersEntity(login, age);
    const salt = this.configService.get("SALT");
    user.setId();
    await user.setPassword(password, +salt);

    return this.usersRepository.create(user);
  }

  public async getAutoSuggestUsers({
    limit,
    loginSubstring,
  }: UserListDto): Promise<UserModel[] | null> {
    const end = limit ?? "-1";
    const users = await this.usersRepository.findAll();
    if (users.length <= 0) {
      return null;
    }
    return users
      .filter((v) =>
        loginSubstring !== null ? v.login.includes(loginSubstring as string) : v,
      )
      .sort((a, b) => {
        const loginA = a.login.toLowerCase();
        const loginB = b.login.toLowerCase();
        if (loginA < loginB) {
          return -1;
        }
        if (loginA > loginB) {
          return 1;
        }
        return 0;
      })
      .slice(0, +end);
  }

  public async findById(id: string): Promise<UserModel | null> {
    return this.usersRepository.findById(id);
  }

  public async update(
    id: string,
    { login, age, password }: Partial<UserDto>,
  ): Promise<UserModel | null> {
    const existedUser = await this.findById(id);
    if (!existedUser) {
      return null;
    }

    const user = new UsersEntity(
      login ? login : existedUser.login,
      age ? age : existedUser.age,
      password ? password : existedUser.password,
      existedUser.id,
    );

    return this.usersRepository.update(user);
  }

  public async remove(id: string): Promise<UserModel | null> {
    const existedUser = await this.findById(id);
    if (!existedUser) {
      return null;
    }
    return this.usersRepository.remove(id);
  }

  async validateUser({ login, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(login);
    if (!existedUser) {
      return false;
    }
    const newUser = new UsersEntity(
      existedUser.login,
      existedUser.age,
      existedUser.password,
    );
    return newUser.comparePassword(password);
  }
}
