import React from 'react';
import NavBar from '../components/NavBar';
import '@fontsource/roboto/400.css';
import InfoCard from '../components/InfoCard';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Container
        className="navigation-content"
        sx={{
          height: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <InfoCard
          title="Welcome"
          titleHook="Welcome to Our Library Management System!"
          sentence="We're glad you're here! Our library management system is designed to make it easy for you to manage your book collections, borrow and return books, and access your account information. Take a look around and explore our features to get started!"
          width={'450px'}
        />
        <img src={null} height={350} width={400} style={{border: 'transparent'}}/>
      </Container>
      <Container 
        sx={{
          backgroundColor: 'white',
        }}>

      </Container>
    </>
  );
};

export default HomePage;
