import React from 'react';
import { Grid } from '@mui/material';
import ReadingListItem from './ReadingListItem'; // Import the ReadingListItem component

const ReadingList = ({ readingList = [], onRemove }) => {
  return (
    <Grid container spacing={2}>
      {readingList.map((book) => (
        <Grid item xs={12} sm={6} md={3} key={book.title}>
          <ReadingListItem book={book} onRemove={() => onRemove(book.title)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReadingList;
