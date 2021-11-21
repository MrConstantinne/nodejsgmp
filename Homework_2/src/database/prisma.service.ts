import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      console.info("[ PrismaService ] Successful connection to the database");
    } catch (e) {
      if (e instanceof Error) {
        console.info(
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
