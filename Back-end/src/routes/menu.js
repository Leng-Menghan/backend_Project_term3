import express from "express";
import { get, getAll, update, remove, create} from "../controllers/menu.js";

const menuRouter = express.Router();
menuRouter.post("/create", create);
menuRouter.get("/getMenus", getAll);
menuRouter.get("/:id", get);
menuRouter.put("/:id", update);
menuRouter.delete("/:id", remove);
export default menuRouter;