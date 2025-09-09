"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const songRouter = (0, express_1.Router)();
songRouter.get("/:slugTopic", controllers_1.songController.getSongs);
exports.default = songRouter;
