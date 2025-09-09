import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
  title:String,
  avatar:String,
  description:String,
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

export default mongoose.model('Topic',topicSchema);