// import tagged template gql function
const { gql } = require('apollo-server-express');

const typeDefs = gql `
input book {
    authors:[String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
   }
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
    login(email: String!, password: String!): Authorize
    addUser(username: String!, email: String!, password: String!): Authorize
    saveBook(bookToSave: book): User
    deleteBook(bookId: String): User
}
`;

module.exports = typeDefs;