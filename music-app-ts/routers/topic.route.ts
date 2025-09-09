import { Router } from "express";
import { topicController } from "../controllers";

const topicRouter:Router = Router();


topicRouter.get('/',topicController.getTopics);

export default topicRouter;
