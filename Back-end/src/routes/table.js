import express from "express";
import {get} from "../controllers/table.js";

const tableRouter = express.Router();
tableRouter.get("/getTables", get);

export default tableRouter;