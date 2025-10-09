import { Sequelize } from "sequelize";
import { User } from "./user.js";

type DbModels = typeof User;

export interface Models {
  [k: string]: DbModels;
   User: typeof User;
}

export interface Db extends Models {
  [k: string]: Sequelize | DbModels;
  sequelize: Sequelize;
}
