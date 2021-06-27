const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const traineeModel = new Schema({
  Own:{
    type: String,
  },
  TraineeId:{
    type: String,
  },
  TraineeName:{
    type: String,
  },
  Date:{
    type: String,
  },
  hisClients:[
    {
    type: Schema.Types.ObjectId,  
    //ObjectId for hisClients from Client module(1st)
    ref: 'samClient'
    }
  ]
});
module.exports = mongoose.model("samTrainee",traineeModel);
