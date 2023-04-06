import { Router } from "express";
import {
  getAllProducts,
  searchProducts,
  getProductsByCategory,
} from "../controllers/product";
const router = Router();

router.get("/category/:category", getProductsByCategory);
router.get("/search", searchProducts);
router.get("/", getAllProducts);

export default router;
