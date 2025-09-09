import { Router } from "express";
import topicRouter from "./topic.route";
import songRouter from "./song.route";
import searchRouter from "./search.route";


const router:Router = Router();

router.use("/topic",topicRouter);

router.use("/songs", songRouter);

router.use("/search", searchRouter);

export default router;
