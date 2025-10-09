import { Dialect, Sequelize } from "sequelize";
import "dotenv/config";

let sequelize: Sequelize;
const env = process.env.NODE_ENV as "development" | "test" | "production";

const useEnvVariable = process.env.DB_URL as string;
// if (env === "production") {
if (useEnvVariable && useEnvVariable.length > 0) {
  const productionConfig = {
    dialect: process.env.DB_DIALECT as Dialect,
    // protocol: process.env.DB_DIALECT,
    dialectOptions: {
      supportBigNumbers: true,
      ssl: false,
    },
    // dialectOptions: {
    //  supportBigNumbers: true,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
    logging: false,
  };
  sequelize = new Sequelize(useEnvVariable, productionConfig);
} else {
  let dbName = "";
  const dbUser = process.env.DB_USER as string;
  const dbHost = process.env.DB_HOST as string;
  const dbPassword = process.env.DB_PASSWORD as string;
  const dbDialect = process.env.DB_DIALECT as Dialect;

  if (env === "development") {
    dbName = process.env.DB_NAME as string;
  }
  if (env === "test") {
    dbName = process.env.TEST_DB_NAME as string;
  }

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
  });
}

export default sequelize;
