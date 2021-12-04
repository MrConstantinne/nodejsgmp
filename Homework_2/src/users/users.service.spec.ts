import "reflect-metadata";
import { UserModel } from "@prisma/client";
import { Container } from "inversify";

import { ConfigServiceInterface } from "../config/config.service.interface";
import { TYPES } from "../types";

import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { UsersServiceInterface } from "./interfaces/users.service.interface";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";

const ConfigServiceMock: ConfigServiceInterface = {
  get: jest.fn(),
};

const UsersRepositoryMock: UsersRepositoryInterface = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
};

const container = new Container();
let configService: ConfigServiceInterface;
let usersRepository: UsersRepositoryInterface;
let usersService: UsersServiceInterface;

beforeAll(() => {
  container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
  container
    .bind<ConfigServiceInterface>(TYPES.ConfigService)
    .toConstantValue(ConfigServiceMock);
  container
    .bind<UsersRepositoryInterface>(TYPES.UsersRepository)
    .toConstantValue(UsersRepositoryMock);

  configService = container.get<ConfigServiceInterface>(TYPES.ConfigService);
  usersRepository = container.get<UsersRepositoryInterface>(
    TYPES.UsersRepository,
  );
  usersService = container.get<UsersServiceInterface>(TYPES.UsersService);
});

let createdUser: UserModel;

describe("User Service", () => {
  it("should create user", async () => {
    configService.get = jest.fn().mockReturnValueOnce("1");
    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: UsersEntity): UserModel => ({
        login: user.login,
        age: user.age,
        password: user.password,
        isDeleted: user.isDeleted,
        id: "1",
      }),
    );
    createdUser = await usersService.add({
      login: "test",
      password: "test123",
      age: 10,
    });

    expect(createdUser.id).toEqual("1");
    expect(createdUser.password).not.toEqual(1);
  });

  it("should validate user - success", async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const result = await usersService.validateUser({
      login: "test",
      password: "test123",
    });
    expect(result).toBeTruthy();
  });

  it("should validate user - wrong password", async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const result = await usersService.validateUser({
      login: "test",
      password: "3",
    });
    expect(result).toBeFalsy();
  });

  it("should validate user - user not found", async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(null);
    const result = await usersService.validateUser({
      login: "test",
      password: "3",
    });
    expect(result).toBeFalsy();
  });

  it("should update user - success", async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const result = await usersService.update("1", {
      age: 20,
      password: "test256",
      login: "lorem",
    });
    if (result) {
      expect(result.password).not.toEqual(createdUser.password);
      expect(result.login).toEqual("lorem");
      expect(result.age).toEqual(20);
    }
  });

  it("should find user by id - success", async () => {
    usersRepository.findById = jest.fn().mockReturnValueOnce(createdUser);
    const result = await usersService.findById("1");
    if (result) {
      expect(result.password).toEqual(createdUser.password);
    }
  });

  it("should find user by id - not found", async () => {
    usersRepository.findById = jest.fn().mockReturnValueOnce(null);
    const result = await usersService.findById("1");
    expect(result).toBeFalsy();
  });

  it("should delete user - success", async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const result = await usersService.remove("1");
    if (result) {
      expect(result.id).not.toEqual(createdUser.id);
    }
  });
});
