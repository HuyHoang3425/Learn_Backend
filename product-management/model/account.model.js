const mongoose = require("mongoose");
const generate = require('../helpers/generate');
const accountSchema = new mongoose.Schema({
  fullName: String,
  email:String,
  password:String,
  token:{
    type:String,
    default:generate.generateRandomString(20),
  },
  phone:String,
  avatar:String,
  role_id:String,
  status:String,
  deleted: {
    type:Boolean,
    default:false
  },
  deletedAt: Date,
},
{
  timestamps:true,
});

const Account = mongoose.model("Account", accountSchema, "Accounts");

module.exports = Account;