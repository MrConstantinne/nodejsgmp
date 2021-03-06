import "reflect-metadata";
import { Server } from "http";

import { json } from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import { inject, injectable } from "inversify";

import { AuthMiddleware } from "./common/auth.middleware";
import { ConfigServiceInterface } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma.service";
import { ExceptionFilterInterface } from "./errors/exception.filter.interface";
import { GroupController } from "./group/group.controller";
import { LoggerInterface } from "./logger/logger.interface";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.GroupsController) private groupsController: GroupController,
    @inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
    @inject(TYPES.ExceptionFilter)
    private exceptionFilter: ExceptionFilterInterface,
  ) {
    this.app = express();
    this.port = +this.configService.get("SERVER_PORT");
  }

  useMiddleware(): void {
    this.app.use(json());
    this.app.use(cors());
    const authMiddleware = new AuthMiddleware(this.configService.get("SECRET"));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes(): void {
    this.app.use("/users", this.usersController.router);
    this.app.use("/groups", this.groupsController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.loggerService.log(`Server listening on port: ${this.port}`);
  }

  public close(): void {
    this.server.close();
  }
}
