import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const ReadingListItem = ({ book, onRemove }) => (
  <Card style={{ position: "relative", margin: "10px" }}>
    <CardMedia
      component="img"
      height="250"
      image={`${process.env.PUBLIC_URL}${book.coverPhotoURL}`}
      title={book.title}
    />
    <CardContent style={{ textAlign: "center" }}>
      <Typography variant="h6">{book.title}</Typography>
      <Typography
        variant="body2"
        sx={{ fontStyle: "italic", marginBottom: "5px" }}
      >
        by {book.author}
      </Typography>
      <Button
        variant="contained"
        style={{ backgroundColor: "#f76484", color: "white" }}
        onClick={onRemove}
      >
        Remove
      </Button>
    </CardContent>
  </Card>
);

export default ReadingListItem;
