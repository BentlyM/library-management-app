import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1200,
  margin: 'auto',
  padding: theme.spacing(4),
}));

const BookList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
}));

const BookCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const BookFormDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(2),
    width: '500px',
  },
}));

const fetchBooks = () =>
  fetch('/api/books').then((response) => response.json());
const fetchRatings = (bookId) =>
  fetch(`/api/ratings?bookId=${bookId}`).then((response) => response.json());
const updateBook = (book) =>
  fetch('/api/books', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  }).then((response) => response.json());

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleEditClick = (book) => {
    setSelectedBook(book);
    fetchRatings(book._id).then((data) => setAverageRating(data.averageRating));
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => setEditDialogOpen(false);

  const handleSaveChanges = () => {
    if (selectedBook) {
      updateBook({ ...selectedBook, rating }).then(() => {
        handleCloseDialog();
        fetchBooks().then((data) => setBooks(data));
      });
    }
  };

  const handleRatingChange = (event, newValue) => setRating(newValue);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <SearchBar>
        <TextField
          fullWidth
          placeholder="Search books..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </SearchBar>
      <BookList>
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((book) => (
            <BookCard key={book._id}>
              <Typography variant="h6">{book.title}</Typography>
              <Box>
                <Typography variant="body2">
                  Rating: {averageRating.toFixed(1)}
                </Typography>
                <IconButton onClick={() => handleEditClick(book)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </BookCard>
          ))}
      </BookList>

      {selectedBook && (
        <BookFormDialog open={editDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={selectedBook.title}
              onChange={(event) =>
                setSelectedBook({ ...selectedBook, title: event.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Summary"
              variant="outlined"
              value={selectedBook.summary}
              onChange={(event) =>
                setSelectedBook({
                  ...selectedBook,
                  summary: event.target.value,
                })
              }
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Genre</InputLabel>
              <Select
                value={selectedBook.genre}
                onChange={(event) =>
                  setSelectedBook({
                    ...selectedBook,
                    genre: event.target.value,
                  })
                }
                label="Genre"
              >
                {[
                  'Fiction',
                  'Non-Fiction',
                  'Mystery',
                  'Thriller',
                  'Science Fiction',
                  'Fantasy',
                  'Romance',
                  'Horror',
                ].map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="subtitle1">Rate this Book:</Typography>
            <Rating
              name="book-rating"
              value={rating}
              onChange={handleRatingChange}
              max={5}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save
            </Button>
          </DialogActions>
        </BookFormDialog>
      )}
    </Container>
  );
};

export default BooksList;
