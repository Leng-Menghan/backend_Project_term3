import express from "express";
import { get} from "../controllers/menu.js";

const menuRouter = express.Router();
menuRouter.get("/getMenus", get);

export default menuRouter;