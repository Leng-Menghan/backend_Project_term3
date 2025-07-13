import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";
const Order = sequelize.define("order", {
    status: {
        type: DataTypes.ENUM('In Progress', 'Ready'),
        allowNull: false,
    },
    guest: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

});


export default Order;