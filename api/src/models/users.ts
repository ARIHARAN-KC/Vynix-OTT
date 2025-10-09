import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Models } from "./types.js";
import sequelize from "../config/config.js";
import { Seq } from "aws-sdk/clients/iotwireless.js";

interface UserAttributes {
    id: string;
    userName: string;
    email?: string;
    role?: "user" | "admin";
    password: string;
    picture?: string;
    createdBy?: Date;
    updatedBy?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "email" | "role" | "picture" | "createdBy" | "updatedBy"> { }

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    declare id: string;
    declare userName: string
    declare email?: string;
    declare role?: "user" | "admin";
    declare password: string
    declare picture?: string;
    declare createdBy?: Date
    declare updatedBy?: Date


    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    declare dataValues?: User;

    // associations
    declare static associations: {};

    static associate(models: Models) {
        // define association here if needed
    }

}


export const UserFactory = (sequelize: Sequelize) => {
    return User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                // unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: false,
            },
            picture: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: true,
            },
            createdBy: {
                type: DataTypes.UUID,
                unique: false,
                allowNull: true,
            },
            updatedBy: {
                type: DataTypes.UUID,
                unique: false,
                allowNull: true,
            },
        },
        {
            tableName: "users",
            sequelize,
        }
    );
};