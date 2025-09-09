import { Request, Response } from "express";
import { topicModel } from "../models";
const getTopics = async (req: Request, res: Response): Promise<void> => {
  const topics = await topicModel.find({
    deleted:false,
  });


  res.render("client/pages/topic",{
    pageTitle:"Chủ đề bài hát",
    topics:topics
  });
};

export default {
  getTopics,
};
