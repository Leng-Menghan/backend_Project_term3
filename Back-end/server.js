import sequelize from "./src/db/database.js";
import "./src/models/index.js";
import {createOrder, createItem, createMenu, createTable, createUser} from "./src/repositories/repository.js";
import express from "express";
import cors from "cors";
import orderRouter from "./src/routes/order.js";
import tableRouter from "./src/routes/table.js";
import menuRouter from "./src/routes/menu.js";
import itemRouter from "./src/routes/item.js";
import orderItemRouter from "./src/routes/orderItem.js";
import userRouter from "./src/routes/user.js";
import { authenticateToken } from "./src/middleware/authentication.js";
async function main() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({ force: true }); // or { force: true } to recreate tables
        console.log("✅ Models synced to the database");
        await createUser("Leng Menghan", "Male", "1999-01-01", "Kandal", "012345678", "han@example.com", "123", "Admin");
        await createUser("Ren Sodalin", "Female", "1999-01-01", "Seam Reap", "012345678", "lin@example.com", "123", "Admin");
        await createUser("Soeun Sokvipor", "Female", "1999-01-01", "Svay Rieng", "012345678", "por@example.com", "123", "Admin");
        await createUser("staff", "Female", "2000-01-01", "Phnom Penh", "012345678", "staff@example.com", "123", "Staff");
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use('/order',authenticateToken,orderRouter);
        app.use('/table',authenticateToken,tableRouter);
        app.use('/menu',authenticateToken,menuRouter);
        app.use('/item',authenticateToken,itemRouter);
        app.use('/orderItem',authenticateToken,orderItemRouter);
        app.use('/user',userRouter);
        app.listen(3000, () => console.log("🚀 Server ready at http://localhost:3000"));
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();