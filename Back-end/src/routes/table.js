import express from "express";
import {getAll, create, updateStatus, get, update, remove} from "../controllers/table.js";

const tableRouter = express.Router();
tableRouter.post("/create", create);
tableRouter.get("/getTables", getAll);
tableRouter.get("/:id", get);
tableRouter.put("/:id", update);
tableRouter.put("/updateStatus/:id", updateStatus);
tableRouter.delete("/:id", remove);
export default tableRouter;