import db from "../database/index.js";
import { decodeBase64, encodeBase64 } from "bcryptjs";

const userModel = db.sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(48),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    version: true,
    hooks: {
      beforeCreate: (user) => {
        user.password = encodeBase64(user.password);
      },
    },
    tableName: "users",
    timestamps: true,
  }
);

export default userModel;
