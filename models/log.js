import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Log = sequelize.define("Log", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    log: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "logs",
    timestamps: true
});

export default Log;
