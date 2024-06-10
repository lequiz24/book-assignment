import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import BookAssignment from "./pages/BookAssignment";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/mulish";
import MenuBar from "./components/MenuBar";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MenuBar />

        <Container style={{ paddingTop: "80px" }}>
          <Box
            sx={{
              background: "linear-gradient(to right, #5ACCCC, #FABD33)",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              display: "inline-block",
            }}
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Book Assignment
            </Typography>
          </Box>
          <BookAssignment />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
