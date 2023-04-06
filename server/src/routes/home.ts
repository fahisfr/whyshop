import { Router } from "express";
import recommendations from "../controllers/recommendations";
import * as homeController from "../controllers/home";

const router: Router = Router();

router.get("/", homeController.getHomeInfo);
router.get("/recommendations", recommendations);

export default router;
