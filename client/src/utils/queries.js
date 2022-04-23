import { gql } from "@apollo/client";

export const ME = gql`
{
    getMe {
      username
      email

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
export const QUERY_ME = gql`
{
    getMe {
      _id
      email
      username
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