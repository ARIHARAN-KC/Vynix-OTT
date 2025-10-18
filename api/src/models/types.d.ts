import { Sequelize } from "sequelize";
import { User } from "./user.js";
import {Anime} from "./anime.js";

type DbModels = typeof User | typeof Anime; 

export interface Models {
  [k: string]: DbModels;
   User: typeof User;
   Animes:typeof Animes;
}

export interface Db extends Models {
  [k: string]: Sequelize | DbModels;
  sequelize: Sequelize;
}
