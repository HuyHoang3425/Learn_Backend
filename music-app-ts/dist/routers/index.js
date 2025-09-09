"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const search_route_1 = __importDefault(require("./search.route"));
const router = (0, express_1.Router)();
router.use("/topic", topic_route_1.default);
router.use("/songs", song_route_1.default);
router.use("/search", search_route_1.default);
exports.default = router;
