"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = exports.songController = exports.topicController = void 0;
const topic_controller_1 = __importDefault(require("./topic.controller"));
exports.topicController = topic_controller_1.default;
const song_controller_1 = __importDefault(require("./song.controller"));
exports.songController = song_controller_1.default;
const search_controller_1 = __importDefault(require("./search.controller"));
exports.searchController = search_controller_1.default;
