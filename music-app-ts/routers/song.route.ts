import { Router } from "express";
import { songController } from "../controllers";

const songRouter:Router = Router();


songRouter.get("/:slugTopic", songController.getSongs);

export default songRouter;
