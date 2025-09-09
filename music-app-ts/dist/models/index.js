"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songModel = exports.singerModel = exports.topicModel = void 0;
const topic_model_1 = __importDefault(require("./topic.model"));
exports.topicModel = topic_model_1.default;
const singer_model_1 = __importDefault(require("./singer.model"));
exports.singerModel = singer_model_1.default;
const song_model_1 = __importDefault(require("./song.model"));
exports.songModel = song_model_1.default;
