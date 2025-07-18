import express from "express";
import {getAll, create, updateStatus} from "../controllers/table.js";

const tableRouter = express.Router();
tableRouter.get("/getTables", getAll);
tableRouter.post("/create", create);
tableRouter.put("/updateStatus/:id", updateStatus);
export default tableRouter;