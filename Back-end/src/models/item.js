import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";
const Item = sequelize.define("item", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

export default Item;