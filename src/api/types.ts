import { ObjectId } from "mongodb";

export type CacheItem = {
  name: string;
  id: string | number;
};

export interface CacheOption {
  _id: ObjectId;
  option: string;
  value: any;
}
