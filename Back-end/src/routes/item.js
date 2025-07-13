import express from "express";
import { get, } from "../controllers/item.js";

const itemRouter = express.Router();
itemRouter.get("/getItems", get);

export default itemRouter;