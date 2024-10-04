import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Container,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { FormControl, Input, InputLabel, FormHelperText } from '@mui/material';
import React, { useReducer, useState } from 'react';

const initialState = {
  email: '',
  password: '',
  error: false,
  isValidEmail: false,
  isValidPassword: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };
    case 'VALIDATE_EMAIL':
      return { ...state, isValidEmail: action.payload };
    case 'VALIDATE_PASSWORD':
      return { ...state, isValidPassword: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClick = () => {
    if (state.email === '' || state.password === '') {
      dispatch({ type: 'SET_ERROR', payload: true });
      return;
    }

    const validateEmail = String(state.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    const validatePassword = String(state.password)
      .trim()
      .match(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/);

    console.log(validateEmail);
    console.log(validatePassword);

    dispatch({ type: 'VALIDATE_EMAIL', payload: validateEmail !== null });
    dispatch({ type: 'VALIDATE_PASSWORD', payload: validatePassword !== null });

    if (validateEmail && validatePassword) {
      dispatch({ type: 'SET_ERROR', payload: false });
      // You can add your login logic here
    } else {
      dispatch({ type: 'SET_ERROR', payload: true });
    }
  };

  const getErrorMessage = () => {
    if (state.email === '') return 'Email address is required';
    if (!state.isValidEmail) return 'Invalid email address';
    if (state.password === '') return 'Password is required';
    if (!state.isValidPassword)
      return 'Password must be at least 8 characters, contain at least one letter, and numbers';
    return '';
  };

  return (
    <div className="login-layout">
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // changed to 100vh to take up the full viewport height
        }}
      >
        <Box
          height={450}
          width={350}
          p={2}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sign In
          </Typography>
          <FormControl sx={{ mb: 2 }}>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              type="email"
              id="email-input"
              aria-describedby="email-helper-text"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_EMAIL', payload: e.target.value })
              }
            />
            <FormHelperText id="email-helper-text">
              Well never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              aria-describedby="password-helper-text"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="password-helper-text">
              Enter your password.
            </FormHelperText>
          </FormControl>
          {state.error && (
            <FormHelperText sx={{ textAlign: 'center', color: 'red' }}>
              {getErrorMessage()}
            </FormHelperText>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%', mb: 2 }}
            type="button"
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Don't have an account? <a href="#">Sign up</a>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
