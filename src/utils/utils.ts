import { DiscordInteraction } from "arcybot";

import { cache, sdk } from "masocheck";
import { Room, UNKNOWN_NAME } from "consts";

export const getOption = <T>(key: string): T =>
  cache.options.find(option => option.option === key)?.value;
  