import { signup } from "./../controllers/user";
import express from "express";
import { Router } from "express";
import {
  AuthenticationController,
  reAuth,
  login,
  logout,
} from "../controllers/user";
import { getUserallOrders } from "../controllers/order";
import isAuth from "../middlewares/userAuthentication";

const router: Router = express.Router();
router.get("/", isAuth, AuthenticationController);
router.get("/orders", isAuth, getUserallOrders);
router.post("/login", login);
router.get("/refresh-token", reAuth);
router.delete("logout", logout);

export default router;
