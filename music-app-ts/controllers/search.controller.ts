import { Request, Response } from "express";
import { singerModel, songModel } from "../models";
import slugify from "slugify";


const search = async (req: Request, res: Response): Promise<void> => {
  const keyword: string = req.query.keyword.toString().trim();
  const typeSearch: string = req.params.typeSearch;

  console.log(typeSearch)
  const formatKeyword = slugify(keyword, {
    replacement: "-",
    lower: false,
    locale: "vi",
    trim: true,
  });

  let newSongs = [];
  if (keyword) {
    const keywordRegex = RegExp(keyword, "i");
    const slugRegex = RegExp(formatKeyword, "i");
    const songs = await songModel
      .find({
        $or: [{ title: keywordRegex }, { slug: slugRegex }],
      })
      .lean();
    for (const song of songs) {
      const singer = await singerModel.findOne({
        _id: song.singerId,
      });
      song["infoSinger"] = singer;
    }
    newSongs = songs;
  }
  switch(typeSearch){
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
    // default:
    //   res.redirect("/");
    //   break;
  }
};

export default {
  search,
};
