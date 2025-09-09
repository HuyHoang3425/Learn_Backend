import { Router } from "express";
import { searchController } from "../controllers";

const searchRouter: Router = Router();

searchRouter.get("/:typeSearch", searchController.search);


export default searchRouter;
