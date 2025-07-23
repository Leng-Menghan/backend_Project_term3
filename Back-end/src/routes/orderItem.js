import express from "express";
import {getAll} from "../controllers/orderItem.js";

const orderItemRouter = express.Router();
orderItemRouter.get("/getOrderItems", getAll);
export default orderItemRouter;