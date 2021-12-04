import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { LoggerInterface } from "../logger/logger.interface";
import { TYPES } from "../types";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
  ) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.loggerService.log(
        "[ PrismaService ] Successful connection to the database",
      );
    } catch (e) {
      if (e instanceof Error) {
        this.loggerService.error(
          "[ PrismaService ] Unsuccessful connection to the database: ",
          e.message,
        );
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
