import { Router } from "express";
import {getOrdersHistory} from "../controllers/order";

const router = Router();

router.get("/orders-history", getOrdersHistory);

export default router;
