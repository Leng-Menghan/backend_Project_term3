import express from "express";
import { get, getAll, update, remove, create, getAllByMenuId } from "../controllers/item.js";

const itemRouter = express.Router();
itemRouter.post("/create", create);
itemRouter.get("/getItems", getAll);
itemRouter.get("/menu/:id", getAllByMenuId);
itemRouter.get("/:id", get);
itemRouter.put("/:id", update);
itemRouter.delete("/:id", remove);

export default itemRouter;