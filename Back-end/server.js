import sequelize from "./src/db/database.js";
import "./src/models/index.js";
import {createOrder, createItem, createMenu, createTable, getOrder} from "./src/repositories/repository.js";
import express from "express";
import cors from "cors";
import orderRouter from "./src/routes/order.js";
import tableRouter from "./src/routes/table.js";
import menuRouter from "./src/routes/menu.js";
import itemRouter from "./src/routes/item.js";
import orderItemRouter from "./src/routes/orderItem.js";
async function main() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({ force: true }); // or { force: true } to recreate tables
        console.log("✅ Models synced to the database");
        await createTable("Table 1", "Available", 5);
        await createMenu("Burgers", "🍔");
        await createItem("Burger", 5.99, 1);
        await createItem("Fries", 2.99, 1);
        await createItem("Coke", 1.99, 1);

        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use('/order',orderRouter);
        app.use('/table',tableRouter);
        app.use('/menu',menuRouter);
        app.use('/item',itemRouter);
        app.use('/orderItem',orderItemRouter);
        
        app.listen(3000, () => console.log("🚀 Server ready at http://localhost:3000"));
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();