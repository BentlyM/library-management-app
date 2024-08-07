import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: 1200,
  margin: 'auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const FormContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const FormField = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
}));

const defaultGenres = [
  { _id: 1, name: 'Fiction' },
  { _id: 2, name: 'Non-Fiction' },
  { _id: 3, name: 'Mystery' },
  { _id: 4, name: 'Thriller' },
  { _id: 5, name: 'Science Fiction' },
  { _id: 6, name: 'Fantasy' },
  { _id: 7, name: 'Romance' },
  { _id: 8, name: 'Horror' },
  { _id: 9, name: 'Historical Fiction' },
  { _id: 10, name: 'Crime' },
  { _id: 11, name: 'Biography' },
  { _id: 12, name: 'Autobiography' },
  { _id: 13, name: 'Self-Help' },
  { _id: 14, name: 'Travel' },
  { _id: 15, name: 'Humor' },
];

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [customAuthors, setCustomAuthors] = useState([]);
  const [genres, setGenres] = useState(defaultGenres);
  const [cover, setCover] = useState(null);
  const [coverLoading, setCoverLoading] = useState(false);
  const [coverError, setCoverError] = useState('');

  useEffect(() => {
    // Fetch authors and genres from API
    fetch('/api/authors')
      .then((response) => response.json())
      .then((data) => setAuthors(data));

    fetch('/api/genres')
      .then((response) => response.json())
      .then((data) => setGenres(data));
  }, []);

  const handleAuthorAdd = () => {
    if (newAuthor && !customAuthors.includes(newAuthor)) {
      setCustomAuthors([...customAuthors, newAuthor]);
      setNewAuthor('');
    }
  };

  const handleAuthorRemove = (authorToRemove) => {
    setCustomAuthors(
      customAuthors.filter((author) => author !== authorToRemove)
    );
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setCover(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fetchCover = () => {
    setCoverLoading(true);
    setCoverError('');
    fetch(
      `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(
        title
      )}&author_name=${encodeURIComponent(author)}$`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.url) {
          setCover(data.url);
        } else {
          setCover(null);
          setCoverError('Cover not found. You can upload your own.');
        }
        setCoverLoading(false);
      })
      .catch(() => {
        setCoverError('Error fetching cover. Please try again.');
        setCoverLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create book object and send to API
    const book = {
      title,
      author,
      summary,
      isbn,
      genre,
      cover,
    };
    console.log(book);
    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Container component="form" onSubmit={handleSubmit} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <ImageContainer>
        {cover ? (
          <img
            src={cover}
            alt="Book Cover"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        ) : coverLoading ? (
          <Typography>Loading cover...</Typography>
        ) : (
          <Typography>No cover available</Typography>
        )}
        {coverError && <Typography color="error">{coverError}</Typography>}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: '1rem' }}
        />
      </ImageContainer>

      <FormContainer>
        <FormTitle variant="h4">Add a New Book</FormTitle>
        <FormField>
          <TextField
            fullWidth
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            id="author"
            label="New Author"
            variant="outlined"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleAuthorAdd();
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleAuthorAdd}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="author-select-label">Author</InputLabel>
            <Select
              id="author-select"
              labelId="author-select-label"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              label="Author"
            >
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {author.name}
                </MenuItem>
              ))}
              {customAuthors.map((author, index) => (
                <MenuItem key={index} value={author}>
                  {author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <TextField
            fullWidth
            id="summary"
            label="Summary"
            variant="outlined"
            multiline
            rows={4}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            id="isbn"
            label="ISBN"
            variant="outlined"
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
          />
        </FormField>
        <FormField>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              id="genre"
              labelId="genre-label"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              label="Genre"
              multiple
            >
              {genres.map((genre) => (
                <MenuItem key={genre._id} value={genre._id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={fetchCover}
            disabled={coverLoading}
          >
            Fetch Cover
          </Button>
          <SubmitButton variant="contained" color="primary" type="submit">
            Create Book
          </SubmitButton>
        </div>
      </FormContainer>
    </Container>
  );
};

export default BookForm;
