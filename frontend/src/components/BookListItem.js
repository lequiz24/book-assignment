import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const BookListItem = ({ book, onAdd }) => {
  const imageUrl = `${process.env.PUBLIC_URL}${book.coverPhotoURL}`;

  return (
    <Card style={{ position: "relative", margin: "10px" }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        onError={() => console.error(`Failed to load image: ${imageUrl}`)} // Log error if image fails to load
      />
      <CardContent style={{ textAlign: "center" }}>
        <Typography
          variant="h8"
          sx={{ fontWeight: "bold" }}
          style={{ marginBottom: "5px" }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", marginBottom: "5px" }}
        >
          by {book.author}
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#54CCCC", color: "white" }}
          onClick={onAdd}
        >
          Add to Reading List
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookListItem;
