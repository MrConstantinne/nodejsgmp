import { Container, ContainerModule, interfaces } from "inversify";

import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { ConfigServiceInterface } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma.service";
import { ExceptionFilterInterface } from "./errors/exception.filter.interface";
import { ExceptionFilter } from "./errors/exeption.filter";
import { GroupController } from "./group/group.controller";
import { GroupRepository } from "./group/group.repository";
import { GroupService } from "./group/group.service";
import { GroupControllerInterface } from "./group/interface/group.controller.interface";
import { GroupRepositoryInterface } from "./group/interface/group.repository.interface";
import { GroupServiceInterface } from "./group/interface/group.service.interface";
import { LoggerInterface } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UsersControllerInterface } from "./users/interfaces/users.controller.interface";
import { UsersRepositoryInterface } from "./users/interfaces/users.repository.interface";
import { UsersServiceInterface } from "./users/interfaces/users.service.interface";
import { UsersController } from "./users/users.controller";
import { UsersRepository } from "./users/users.repository";
import { UsersService } from "./users/users.service";

export interface BootstrapReturnInterface {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App).inSingletonScope();
  bind<ConfigServiceInterface>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<UsersControllerInterface>(TYPES.UsersController)
    .to(UsersController)
    .inSingletonScope();
  bind<GroupControllerInterface>(TYPES.GroupsController)
    .to(GroupController)
    .inSingletonScope();
  bind<UsersServiceInterface>(TYPES.UsersService)
    .to(UsersService)
    .inSingletonScope();
  bind<GroupServiceInterface>(TYPES.GroupsService)
    .to(GroupService)
    .inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<UsersRepositoryInterface>(TYPES.UsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
  bind<GroupRepositoryInterface>(TYPES.GroupsRepository)
    .to(GroupRepository)
    .inSingletonScope();
  bind<ExceptionFilterInterface>(TYPES.ExceptionFilter)
    .to(ExceptionFilter)
    .inSingletonScope();
  bind<LoggerInterface>(TYPES.LoggerService)
    .to(LoggerService)
    .inSingletonScope();
});

async function bootstrap(): Promise<BootstrapReturnInterface> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  await app.init();
  return { app, appContainer };
}

export const boot = bootstrap();
