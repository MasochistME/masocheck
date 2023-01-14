import { CommandObject } from "arcybot";

import { getCommandsFromAPI, getAllOptionsFromAPI } from "./api";
import { CacheOption } from "./types";

type CacheConfig = {
  botDb?: string;
  masochistDb?: string;
};

export class Cache {
  public botDb: string;
  public options: CacheOption[] = [];
  public commandList: CommandObject[] = [];

  constructor(config: CacheConfig) {
    this.botDb = config.botDb ?? "";
  }

  private async updateBot() {
    this.commandList = await getCommandsFromAPI();
    this.options = await getAllOptionsFromAPI();
  }

  async update() {
    await this.updateBot();
  }
}
