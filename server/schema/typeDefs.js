// import tagged template gql function
const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Book {
    authors:[String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
   }

type User {
_id: ID
username: String
email: String
savedBooks: [Book]
}

type Authorize {
    token: ID!
    user: User
}

type Query {
    getMe: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Authorize
}
`;

module.exports = typeDefs;