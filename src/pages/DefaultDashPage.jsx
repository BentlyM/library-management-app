import { Container } from '@mui/material';
import React from 'react';

const DefaultDashPage = () => {
  return (
    <>
      <Container>
        <p>Manage your library efficiently with the following options:</p>
        <ul>
          <li>Add new books to the library collection.</li>
          <li>View and manage the current list of books.</li>
          <li>Send books to other locations or libraries.</li>
          <li>Borrow books from the library.</li>
        </ul>
      </Container>
    </>
  );
};

export default DefaultDashPage;
