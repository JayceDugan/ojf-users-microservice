import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";

export class User extends Model {}

User.init(
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		passwordHash: {
			allowNull: false,
			type: DataTypes.CHAR(64)
		}
	},
	{
		defaultScope: {
			rawAttributes: { exclude: ["passwordHash"] }
		},
		modelName: "users",
		sequelize
	}
);

export class UserSessions extends Model {}

UserSessions.init(
	{
		userId: {
			allowNull: false,
			references: {
				key: "id",
				model: "users"
			},
			type: DataTypes.UUID
		},
		expiresAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
	},
	{
		defaultScope: {
			rawAttributes: { exclude: ["passwordHash"] }
		},
		modelName: "userSessions",
		paranoid: false,
		updatedAt: false,
		sequelize
	}
);
