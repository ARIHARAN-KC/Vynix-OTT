import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Models } from "./types.js";
import sequelize from "../config/config.js";

interface AnimeAttributes {
  id: string;
  title: string;
  description: string;
  thumbnail_s3_key: string;
  banner_s3_key: string;
  genres: string[];
  release_year: number;
  rating: string;
  createdBy?: string;
  updatedBy?: string;
}

interface AnimeCreationAttributes extends Optional<AnimeAttributes,"id" | "createdBy" | "updatedBy"> {}
export class Anime
  extends Model<AnimeAttributes, AnimeCreationAttributes>
  implements AnimeAttributes
{
  declare id: string;
  declare title: string;
  declare description: string;
  declare thumbnail_s3_key: string;
  declare banner_s3_key: string;
  declare genres: string[];
  declare release_year: number;
  declare rating: string;
  declare createdBy?: string;
  declare updatedBy?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: Models) {
    // define associations here if needed
  }
}

export const AnimeFactory = (sequelize: Sequelize) => {
  return Anime.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail_s3_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      banner_s3_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue:[],
        allowNull: false,
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "animes",
      sequelize,
    }
  );
};
