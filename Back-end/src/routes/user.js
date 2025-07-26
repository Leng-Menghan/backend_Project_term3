import {login, getAll, register, get, remove, update} from "../controllers/user.js";
import {authenticateToken} from "../middleware/authentication.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.get("/getUsers", authenticateToken, getAll);
userRouter.get("/:id", authenticateToken, get);
userRouter.put("/:id", authenticateToken, update);
userRouter.delete("/:id", authenticateToken, remove);
userRouter.post("/login", login);
export default userRouter;