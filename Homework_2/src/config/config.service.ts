import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";

import { LoggerInterface } from "../logger/logger.interface";
import { TYPES } from "../types";

import { ConfigServiceInterface } from "./config.service.interface";

@injectable()
export class ConfigService implements ConfigServiceInterface {
  private readonly config: DotenvParseOutput;

  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerInterface,
  ) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error(
        "[ ConfigService ] Configuration not loaded: ",
        result.error,
      );
    } else {
      this.loggerService.log(
        "[ ConfigService ] Configuration loaded successfully",
      );
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
