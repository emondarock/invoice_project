const {ApolloServer, gql} = require('apollo-server');

export const typeDefs = gql`    
    type msg{
        msg: String
    }
    
#    All Query
    type Query{
        testQuery: msg
    }
    
#    ALL Mutation
    type Mutation{
        testMutation: msg
    }
`