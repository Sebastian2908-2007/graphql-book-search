import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
   mutation saveBook($bookToSave: book) {
       saveBook(bookToSave: $bookToSave) {
          username
          _id
          savedBooks {
              authors
              description
              bookId
              image
              link
              title
          } 
       }
   }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          token
          user {
              _id
              username
              email
          }
      }
  }
`;

export const DELETE_BOOK = gql`
 mutation deleteBook($bookId: String) {
     deleteBook(bookId: $bookId) {
         username
         email
         savedBooks {
             authors
             description
             image
              link
         }
             
         
     }
 }
`;

export const ADD_USER = gql`
   mutation addUser($username: String!, $email: String!,$password: String!) {

         addUser(username: $username, email: $email, password: $password) {

             token

             user {

                 email

                 username

             }
         }
   }
`;