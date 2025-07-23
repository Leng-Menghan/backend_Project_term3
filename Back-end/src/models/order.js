import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";
const Order = sequelize.define("order", {
    status: {
        type: DataTypes.ENUM('In Progress', 'Ready', 'Completed'),
        allowNull: false,
    },
    guest: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM('Paid', 'Unpaid'),
        allowNull: false,
    },
});


export default Order;