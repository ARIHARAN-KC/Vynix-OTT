import { User } from "lucide-react";
import sequelize from "../config/config.js";
import { Db, Models } from "./types.js";
import { UserFactory } from "./users.js";

const models: Models = {
  User:UserFactory(sequelize)
};

Object.values(models).forEach((model: any) => {
  if (typeof (model as any).associate === "function") {
    (model as any).associate(models);
  }
});

const db: Db = {
  sequelize,
  ...models,
};

export default db;
