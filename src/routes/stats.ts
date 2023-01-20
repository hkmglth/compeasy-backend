import { getAllStats } from "../controllers/stats";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/getAllStats", auth, getAllStats);
export default router;
