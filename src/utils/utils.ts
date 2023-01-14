import { cache } from "masocheck";

export const getOption = <T>(key: string): T =>
  cache.options.find(option => option.option === key)?.value;
