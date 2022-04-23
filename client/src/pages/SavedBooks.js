import { useQuery } from '@apollo/client';
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks =  () => {
 

  const [deleteBook,{err}] = useMutation(DELETE_BOOK, {
    update(cache, { data: {  deleteBook } } ) {
      try {
        const { getMe } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {getMe: {...getMe,savedBooks: [...getMe.savedBooks, deleteBook] } }
          
        });
      } catch (e) {
        console.error(e);
        console.log(err)
      }
    }
  }) ;

  
  const {data: userData,loading,error} =  useQuery(QUERY_ME);
  
  // it seems the below two lines were essential in makinging this all work note to future self for useQuery
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
 
  
  

  

  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
   
    try {
      const response = await deleteBook({
      variables: { bookId }
      });

      if (!response) {
        throw new Error('something went wrong!');
      }

    
     
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };



//console.log(userData);
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          { userData.getMe.savedBooks.length
            ? `Viewing ${userData.getMe.savedBooks.length} saved ${userData.getMe.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.getMe.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
