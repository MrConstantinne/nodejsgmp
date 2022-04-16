import "reflect-metadata";
import { GroupModel } from "@prisma/client";
import { Container } from "inversify";

import { ConfigServiceInterface } from "../config/config.service.interface";
import { TYPES } from "../types";
import { UsersRepositoryInterface } from "../users/interfaces/users.repository.interface";

import { Permission } from "./dto/group.dto";
import { GroupEntity } from "./group.entity";
import { GroupService } from "./group.service";
import { GroupRepositoryInterface } from "./interface/group.repository.interface";
import { GroupServiceInterface } from "./interface/group.service.interface";

const ConfigServiceMock: ConfigServiceInterface = {
  get: jest.fn(),
};

const groupRepositoryMock: GroupRepositoryInterface = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findAll: jest.fn(),
  add: jest.fn(),
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
let groupRepository: GroupRepositoryInterface;
let groupService: GroupServiceInterface;
let usersRepository: UsersRepositoryInterface;

beforeAll(() => {
  container.bind<GroupServiceInterface>(TYPES.GroupsService).to(GroupService);
  container
    .bind<ConfigServiceInterface>(TYPES.ConfigService)
    .toConstantValue(ConfigServiceMock);
  container
    .bind<GroupRepositoryInterface>(TYPES.GroupsRepository)
    .toConstantValue(groupRepositoryMock);
  container
    .bind<UsersRepositoryInterface>(TYPES.UsersRepository)
    .toConstantValue(UsersRepositoryMock);

  configService = container.get<ConfigServiceInterface>(TYPES.ConfigService);
  groupRepository = container.get<GroupRepositoryInterface>(
    TYPES.GroupsRepository,
  );
  groupService = container.get<GroupServiceInterface>(TYPES.GroupsService);
  usersRepository = container.get<UsersRepositoryInterface>(
    TYPES.UsersRepository,
  );
});

let createdGroup: GroupModel;
let permission: Permission[];

describe("Group Service", () => {
  it("should create group", async () => {
    configService.get = jest.fn().mockReturnValueOnce("1");
    groupRepository.create = jest.fn().mockImplementationOnce(
      (group: GroupEntity): GroupModel => ({
        name: group.name,
        permission: group.permission,
        id: "1",
      }),
    );
    createdGroup = await groupService.add({
      name: "test",
      permission,
      id: "1",
    });

    expect(createdGroup.id).toEqual("1");
    expect(createdGroup.name).toEqual("test");
  });

  it("should update group - success", async () => {
    groupRepository.findById = jest.fn().mockReturnValueOnce(createdGroup);
    const result = await groupService.update("1", {
      name: "test2",
    });
    if (result) {
      expect(result.id).not.toEqual(createdGroup.id);
      expect(result.name).not.toEqual(createdGroup.name);
    }
  });

  it("should find group by id - success", async () => {
    groupRepository.findById = jest.fn().mockReturnValueOnce(createdGroup);
    const result = await groupService.findById("1");
    if (result) {
      expect(result.name).toEqual(createdGroup.name);
    }
  });

  it("should find group by id - not found", async () => {
    groupRepository.findById = jest.fn().mockReturnValueOnce(null);
    const result = await groupService.findById("1");
    expect(result).toBeFalsy();
  });

  it("should delete group - success", async () => {
    groupRepository.findById = jest.fn().mockReturnValueOnce(createdGroup);
    const result = await groupService.remove("1");
    if (result) {
      expect(result.id).not.toEqual(createdGroup.id);
    }
  });

  it("should find all group - success", async () => {
    groupRepository.findAll = jest.fn().mockReturnValueOnce(createdGroup);
    const result = await groupService.getAllGroups();
    if (result) {
      expect(result).toEqual(createdGroup);
    }
  });
});
