import { Container, ContainerModule, interfaces } from "inversify";

import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { ConfigServiceInterface } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma.service";
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
  bind<UsersServiceInterface>(TYPES.UsersService)
    .to(UsersService)
    .inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<UsersRepositoryInterface>(TYPES.UsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
