import mongoose from "mongoose";

export const connect = async ():Promise<void> => {
  try{
    await mongoose.connect("mongodb://localhost:27017/music-app");
    console.log("db connect success!");
  }catch{
    console.log("db connect error!");
  }
}


