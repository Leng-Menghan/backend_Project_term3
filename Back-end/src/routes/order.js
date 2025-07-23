import express from "express";
import { create, get, getAll, update, remove, updateStatus, updatePayment} from "../controllers/order.js";

const orderRouter = express.Router();
orderRouter.post("/create", create);
orderRouter.get("/getOrders", getAll);
orderRouter.get("/:id", get);
orderRouter.put("/:id", update);
orderRouter.put("/updateStatus/:id", updateStatus);
orderRouter.put("/updatePaymentStatus/:id", updatePayment);
orderRouter.delete("/:id", remove);
export default orderRouter;