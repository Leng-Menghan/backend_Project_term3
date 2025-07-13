import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";
const orderItem = sequelize.define("orderItem", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default orderItem;