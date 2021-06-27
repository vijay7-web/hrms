const mongoose = require("mongoose");

const Schema = mongoose.Schema

const clientModel = new Schema({
  Own:{
    type: String,
  },
  ClientName:{
    type: String,
  },
  ClientId:{
    type: String,
  },
  CompanyName:{
    type: String,
  },
  hisTrainee:{
    type: Schema.Types.ObjectId,
    ref: 'samTrainee'
  }
});
module.exports = mongoose.model("samClient",clientModel);
