import auth from "../middleware/auth";
import express from "express";
import { register, login, getUserByToken } from "../controllers/auth";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.get("/getUserByToken", getUserByToken);
export default router;
