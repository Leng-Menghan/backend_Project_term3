import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";
const Menu = sequelize.define("menu", {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Menu