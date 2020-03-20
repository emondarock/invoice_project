const {ApolloServer, gql} = require("apollo-server");
const db = require('./Constant/Database');

import {typeDefs, resolvers} from './Graphql';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req,connection}) => {
        // const tokenEnsure = await ensureJWTToken(req);
        // const validateToken = await validateJWTToken(req, token.jwtToken)
        // console.log(req.headers["authorization"])
        if (connection) {
            // check connection for metadata
            return connection.context;
        }


    },
    endpoint: {
        url: "http://localhost:3000"
    },
    debug: true,
    tracing: true,
    introspection: true,
    playground: true
});

server.listen({port: process.env.PORT || 4000}).then(async ({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
