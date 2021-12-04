import { Container, ContainerModule, interfaces } from "inversify";

import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { ConfigServiceInterface } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma.service";
import { GroupController } from "./group/group.controller";
import { GroupRepository } from "./group/group.repository";
import { GroupService } from "./group/group.service";
import { GroupControllerInterface } from "./group/interface/group.controller.interface";
import { GroupRepositoryInterface } from "./group/interface/group.repository.interface";
// eslint-disable-next-line import/namespace
import { GroupServiceInterface } from "./group/interface/group.service.interface";
import { TYPES } from "./types";
import { UsersControllerInterface } from "./users/interfaces/users.controller.interface";
import { UsersRepositoryInterface } from "./users/interfaces/users.repository.interface";
import { UsersServiceInterface } from "./users/interfaces/users.service.interface";
import { UsersController } from "./users/users.controller";
import { UsersRepository } from "./users/users.repository";
import { UsersService } from "./users/users.service";

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
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
