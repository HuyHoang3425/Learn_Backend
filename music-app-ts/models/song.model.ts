import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
  title:String,
  avatar:String,
  description:String,
  singerId:String,
  topicId:String,
  like:Number,
  lyrics:String,
  audio:String,
  status:String,
  slug:String,
  deleted:{
    type:Boolean,
    default:false,
  },
  deleteAt:Date,
},{
  timestamps:true,
});

export default mongoose.model('Song',songSchema);