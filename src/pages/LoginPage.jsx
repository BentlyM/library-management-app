import { Box, Container, Typography, Button } from '@mui/material';
import { FormControl, Input, InputLabel, FormHelperText } from '@mui/material';
import React from 'react';

const LoginPage = () => {
  return (
    <div className='login-layout'>
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
            <Input id="email-input" aria-describedby="email-helper-text" />
            <FormHelperText id="email-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              type="password"
              aria-describedby="password-helper-text"
            />
            <FormHelperText id="password-helper-text">
              Enter your password.
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%', mb: 2 }}
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
