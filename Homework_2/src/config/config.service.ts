import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { injectable } from "inversify";

import { ConfigServiceInterface } from "./config.service.interface";

@injectable()
export class ConfigService implements ConfigServiceInterface {
  private readonly config: DotenvParseOutput;

  constructor() {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      console.error(
        "[ ConfigService ] Configuration not loaded: ",
        result.error,
      );
    } else {
      console.info("[ ConfigService ] Configuration loaded successfully");
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
