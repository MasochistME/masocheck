import * as dotenv from "dotenv";
import { Arcybot, log } from "arcybot";
import { GatewayIntentBits, Partials } from "discord.js";
import { SDK } from "@masochistme/sdk/dist/v1/sdk";

import { getOption ,Database} from "utils";
import { commandsFunctions, customCommands } from "commands";
import { handleModals, handleAutocomplete, handleButtons } from "interactions";

dotenv.config();

/************************
 *        CONFIG        *
 ************************/

export const mmeDb =
  process.env["ENV"] === "dev" ? "masochist-dev" : "masochist";

const host =
  process.env["ENV"] === "dev"
    ? "http://localhost:3081"
    : "http://65.108.214.190:3002";

export const sdk = new SDK({
  host,
  authToken: process.env.ACCESS_TOKEN,
});

export const mongo = new Database([{ symbol: botDb, url: process.env["DB"] }]);

/************************
 *      BOT CONFIG      *
 ************************/

export let bot: Arcybot;

const init = async () => {
  const config = {
    discordToken: process.env.DISCORD_TOKEN,
    botId: process.env.BOT_ID,
    modRole: getOption("modRole") as string,
    guildId: getOption("guildId") as string,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  };

  bot = new Arcybot(
    config,
    cache.commandList,
    commandsFunctions,
    // @ts-ignore
    customCommands,
  );

  bot.start("Dr. Fetus reporting for destruction!");

  bot.botClient
    .on("ready", async () => {
      // Race timer checks every minute if any race should get updated.
      handleRaceTimer();
    })
    .on("interactionCreate", async interaction => {
      if (interaction.isAutocomplete()) handleAutocomplete(interaction);
      if (interaction.isButton()) handleButtons(interaction);
      if (interaction.isModalSubmit()) handleModals(interaction);
    })
    .on("error", async error => {
      log.DEBUG("Discord bot error detected");
      console.log(error);
    })
    .on("warn", async (message: string) => {
      log.DEBUG("Discord bot warning detected");
      console.log(message);
    })
    .on("debug", console.log);
};

init();
