import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TextField, Typography, Grid, Box, Button, Container } from '@mui/material';
import BookListItem from '../components/BookListItem';
import ReadingListItem from '../components/ReadingListItem';
import RemovalConfirmationDialog from '../components/ConfirmationDialog';
import DuplicateConfirmationDialog from '../components/DuplicateConfirmationDialog';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      title
    }
  }
`;

const BookAssignment = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [readingList, setReadingList] = useState([]);
  const [removalDialogOpen, setRemovalDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [bookToRemove, setBookToRemove] = useState(null);
  const [numBooksToShow, setNumBooksToShow] = useState(12); // Initial number of books to show
  const [showLoadMore, setShowLoadMore] = useState(false); // Control floating Load More button

  // Extracted hooks
  useEffect(() => {
    const handleScroll = () => {
      const lastBookBottom =
        document.querySelector('.book-grid')?.getBoundingClientRect().bottom || 0;
      const viewportBottom = window.innerHeight;
      setShowLoadMore(lastBookBottom <= viewportBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showLoadMore]); // Ensure the hook is called unconditionally

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddBook = (book) => {
    if (!readingList.some((item) => item.title === book.title)) {
      setReadingList([...readingList, book]);
    } else {
      setDialogTitle('Duplicate Book');
      setDialogContent('This book is already in your reading list.');
      setDuplicateDialogOpen(true);
    }
  };

  const handleRemoveBook = (title) => {
    setDialogTitle('Confirm Removal');
    setDialogContent(`Are you sure you want to remove "${title}" from your reading list?`);
    setBookToRemove(title);
    setRemovalDialogOpen(true);
  };

  const confirmRemoveBook = () => {
    setReadingList(readingList.filter((book) => book.title !== bookToRemove));
    setRemovalDialogOpen(false);
  };

  const handleCloseRemovalDialog = () => {
    setRemovalDialogOpen(false);
  };

  const handleCloseDuplicateDialog = () => {
    setDuplicateDialogOpen(false);
  };

  const filteredBooks = data.books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setNumBooksToShow(numBooksToShow + 12);
  };

  return (
    <Box>
      <TextField
        label="Search for books"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        sx={{ borderRadius: '15px' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {readingList.length > 0 && (
        <>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            style={{ marginTop: '20px' }}
          >
            Reading List
          </Typography>
          <Grid container spacing={2}>
            {readingList.map((book, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ReadingListItem
                  book={book}
                  onRemove={() => handleRemoveBook(book.title)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        style={{ marginTop: '20px' }}
      >
        All Books
      </Typography>
      <Grid container spacing={2} className="book-grid">
        {filteredBooks.slice(0, numBooksToShow).map((book, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BookListItem book={book} onAdd={() => handleAddBook(book)} />
          </Grid>
        ))}
      </Grid>

      {showLoadMore && (
        <Container
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: '1000',
          }}
        >
          <Button variant="contained"
          style={{ backgroundColor: "#FAAD00", color: "white" }} onClick={handleLoadMore}>
            Load More
          </Button>
        </Container>
      )}

      <RemovalConfirmationDialog
        open={removalDialogOpen}
        onClose={handleCloseRemovalDialog}
        onConfirm={confirmRemoveBook}
        title={dialogTitle}
        content={dialogContent}
      />

      <DuplicateConfirmationDialog
        open={duplicateDialogOpen}
        onClose={handleCloseDuplicateDialog}
        title={dialogTitle}
        content={dialogContent}
      />
    </Box>
  );
};

export default BookAssignment;
