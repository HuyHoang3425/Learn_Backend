import { Request, Response } from "express";
import { singerModel, songModel, topicModel } from "../models";

const getSongs = async (req: Request, res: Response): Promise<void> => {
  const { slugTopic } = req.params;

  const topic = await topicModel.findOne({
    slug:slugTopic,
  });

  const songs = await songModel.find({
    topicId:topic.id,
    status:"active",
    deleted:false,
  })

  for(const song of songs){
    const singer = await singerModel.findOne({
      _id:song.singerId,
    });
    song["infoSinger"] = singer;
  }
  console.log(songs);
  res.render("client/pages/song",{
    songs:songs
  })
};

export default {
  getSongs,
}
