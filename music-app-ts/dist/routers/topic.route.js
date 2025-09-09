"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const topicRouter = (0, express_1.Router)();
topicRouter.get('/', controllers_1.topicController.getTopics);
exports.default = topicRouter;
