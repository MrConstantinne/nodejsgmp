import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";

import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../types";

import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { UsersEntity } from "./users.entity";

@injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {}
  async create({
    id,
    login,
    password,
    age,
    isDeleted,
  }: UsersEntity): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: { id, login, password, age, isDeleted },
    });
  }

  async findById(id: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findUnique({ where: { id } });
  }

  async update({
    id,
    login,
    password,
    age,
  }: UsersEntity): Promise<UserModel | null> {
    return this.prismaService.client.userModel.update({
      where: { id },
      data: { login, password, age },
    });
  }

  async remove(id: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.delete({ where: { id } });
  }

  async findAll(): Promise<UserModel[] | []> {
    return this.prismaService.client.userModel.findMany();
  }
  async find(login: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: {
        login,
      },
    });
  }
}
