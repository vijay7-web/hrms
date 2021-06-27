const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const cors  = require("cors")
const mongoose = require("mongoose")


const {typeDefs} = require("./schema/typeDefs");
const {resolvers}= require("./resolvers/resolvers");



const app = express();




app.use(cors());



const server = new ApolloServer(
   {
       typeDefs, resolvers}

    );

server.applyMiddleware({app,cors:false});

mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb+srv://logincred:passwd@cluster0.slvqd.mongodb.net/HRMS?retryWrites=true&w=majority",
{useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex:true,
useFindAndModify:false})

app.listen(port = 4050, () =>{
        console.log(`serve is ready at http://localhost:${port}`)
    });
