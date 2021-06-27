const ModelTrainee = require('../models/trainee');
const ModelClient = require('../models/client');
const { Model } = require('mongoose');
const trainee = require('../models/trainee');

const train = (traineeId)=>{
    return ModelTrainee.findById(traineeId)
    .then(trainee => {
        return {
            ...trainee._doc,
            _id: trainee.id,
             hisClients: clients.bind(this, trainee._doc.hisClients)
          };
    })
    .catch(err => {
        throw err;
    })
}
const clients = (clientIds) => {
  return ModelClient.find({_id: { $in: clientIds } })
  .then(clients => {
    return clients.map(client => {
      return {
        ...client._doc,
        _id: client.id,
        hisTrainee: train.bind(this, client._doc._hisTrainee)
      }
    })
  })
}

const resolvers = {
  Query:{
    // specified Query
    // trainee(TraineeName: String): [Trainee]
    trainee : async(parent, {TraineeName}) => {
      return await ModelTrainee.find({TraineeName});
    },
    // client(ClientName: String): [Client]
    client : async(parent, {ClientName}) => {
      return await ModelClient.find({ClientName});
    },
    // non-specified Query
    // trainees: [Trainee]
    trainees : async(parent,args) => {
      const trainees = await ModelTrainee.find(args);
      return trainees.map(trainee => {
        return{...trainee._doc,
             _id: trainee.id,
              hisClients: clients.bind(this, trainee._doc.hisClients)
       }
      })
    },
    // clients: [Client]
    clients : async(parent,args) => {
      const clients = await ModelClient.find(args);
      return clients.map(client => {
        return {
          ...client._doc,
          _id: client.id,
          hisTrainee: train.bind(this, client._doc.hisTrainee) 
        }
      })
    },

  },
  Mutation:{
    // addTrainee(traineeInput: TraineeInput): Trainee
    addTrainee : (parent,args) => {      
      const trainee = new ModelTrainee({
        TraineeId: args.traineeInput.TraineeId,
        TraineeName: args.traineeInput.TraineeName,
        Date: args.traineeInput.Date,
        Own: args.traineeInput.Own,
        // hisClients: ''
      });
      return trainee.save()
      .then(result => {
        return {...result._doc, _id: result.id};
      })
     .catch(err => {
        throw err;
      })
    },
    // addClient(clientInput: ClientInput): Client
    addClient : (parent,args) => {
      const client = new ModelClient({
        ClientName: args.clientInput.ClientName,
        ClientId: args.clientInput.ClientId,
        CompanyName: args.clientInput.CompanyName,
        Own: args.clientInput.Own,
        hisTrainee:'60d838f9de725746040f4319'
      });
      let Cleint;
      return client.save()
      .then(result => {
        Cleint = {...result._doc, _id: result._doc._id.toString( ),hisTrainee: train.bind(this,result._doc.hisTrainee)};

        return ModelTrainee.findById('60d838f9de725746040f4319')
      })
      .then(trainee=> {
        return trainee.hisClients.push(client);
        
      })
      .then(result => {
        return Cleint;
      })
      .catch(err => {
        throw err;
      });
    },
  },
};  

module.exports = {resolvers};
