import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";
const Table = sequelize.define("table", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Occupied', 'Available'),
        allowNull: false,
    },
    seat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default Table;