const {gql} = require("apollo-server-express")
// const { buildSchema } = require("graphql");
const typeDefs = gql`
      type Trainee {
          _id: ID!
          Own: String
          TraineeId: String!
          TraineeName: String!
          DOB: String!
          hisClients: [Client!]
        }

        input TraineeInput{
            Own: String
            TraineeId: String!
            TraineeName: String!
            Date: String!
        }
        type Client{
          _id: ID!
          Own: String
          ClientId: String!
          ClientName: String!
          CompanyName: String!
          hisTrainee: Trainee!
        }
        input ClientInput{
          Own: String
          ClientId: String!
          ClientName: String!
          CompanyName: String!
        }
        type Query{
          trainee(TraineeName: String): [Trainee]
          trainees: [Trainee]
          client(ClientName: String): [Client]
          clients: [Client]
        }
        type Mutation{
          addTrainee(traineeInput: TraineeInput): Trainee
          addClient(clientInput: ClientInput): Client
        }
`;
module.exports = {typeDefs};
