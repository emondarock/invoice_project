// console.log(process.env.BUCKET)
import {verifyJwtToken} from "./Helper/JWTValidation";

const http = require('http');
const db = require('./Constant/Database');
import {typeDefs, resolvers} from './Graphql';
// import {verifyJwtToken} from "./Helper/JWTValidation";
import {isAuthenticated} from "./Graphql/Directives";
require('dotenv').config();
const {ApolloServer, gql} = require("apollo-server-express");
const express = require('express');
// console.log(process.env.NODE_ENV)
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,

    schemaDirectives: {
        isAuthenticated
    },
    context: async ({req,connection}) => {
        if (connection) {
            // check connection for metadata
            return connection.context;
        }

        const jwtData = await verifyJwtToken(req.headers["authorization"]);
        if (req.headers["Authorization"] !== undefined) {
            console.log("Token Bearer => ", req.headers["authorization"])
            console.log("USER DECODE DATA => ", jwtData)
        }
        return {
            bearerToken: req.headers["authorization"],
            ip: req.ip,
            user: jwtData
        };
    },
    endpoint: {
        url: "http://localhost:3000"
    },
    debug: true,
    tracing: true,
    introspection: true,
    playground: true
});


const httpServer = http.createServer(app);
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer)

app.get("/", (req,res)=>{
    res.status(200).json({
        msg: "Hello Server"
    })
})


httpServer.listen({port: process.env.PORT || 5000},(url)=>{
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 5000}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT || 5000}${server.subscriptionsPath}`)
})
