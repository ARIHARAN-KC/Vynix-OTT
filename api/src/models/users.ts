import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Models } from "./types.js";
import sequelize from "../config/config.js";

interface UserAttributes {
    id: string;
    userName: string;
    email?: string;
    role?: "user" | "admin";
    password?: string;
    picture?: string;
    createdBy?: string;
    updatedBy?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "email" | "role" | "password" | "picture" | "createdBy" | "updatedBy"> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare userName: string;
    declare email?: string;
    declare role?: "user" | "admin";
    declare password?: string;
    declare picture?: string;
    declare createdBy?: string;
    declare updatedBy?: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    declare static associations: {};

    static associate(models: Models) {
        // define association here if needed in the future
     }
}

export const UserFactory = (sequelize: Sequelize) => {
    return User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "user"
            },
            picture: {
                type: DataTypes.TEXT, // changed from STRING to TEXT
                allowNull: true
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: true
            },
            updatedBy: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            tableName: "users",
            sequelize
        }
    );
};
