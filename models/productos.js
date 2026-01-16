import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Producto = sequelize.define("Productos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: "productos",
  timestamps: true
});

export default Producto;
