import {
  getProductsByCompanyId,
  getAllProducts,
  deleteProductById,
  addProduct,
  updateProduct,
  getProductById,
} from "../controllers/products";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/getProductsByCompanyId", auth, getProductsByCompanyId);
router.get("/getAllProducts", auth, getAllProducts);
router.post("/deleteProductById", auth, deleteProductById);
router.post("/addProduct", auth, addProduct);
router.post("/updateProduct", auth, updateProduct);
router.post("/getProductById", auth, getProductById);
export default router;
