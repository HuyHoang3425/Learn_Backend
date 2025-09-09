"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const slugify_1 = __importDefault(require("slugify"));
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword.toString().trim();
    const typeSearch = req.params.typeSearch;
    console.log(typeSearch);
    const formatKeyword = (0, slugify_1.default)(keyword, {
        replacement: "-",
        lower: false,
        locale: "vi",
        trim: true,
    });
    let newSongs = [];
    if (keyword) {
        const keywordRegex = RegExp(keyword, "i");
        const slugRegex = RegExp(formatKeyword, "i");
        const songs = yield models_1.songModel
            .find({
            $or: [{ title: keywordRegex }, { slug: slugRegex }],
        })
            .lean();
        for (const song of songs) {
            const singer = yield models_1.singerModel.findOne({
                _id: song.singerId,
            });
            song["infoSinger"] = singer;
        }
        newSongs = songs;
    }
    switch (typeSearch) {
        case "result":
            res.render("client/pages/search", {
                pageTitle: "kết quả",
                songs: newSongs,
                keyword: keyword,
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "thành công",
                songs: newSongs,
            });
            break;
    }
});
exports.default = {
    search,
};
