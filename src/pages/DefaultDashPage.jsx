import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import defaultImage from '../../public/DefaultDisplayImage.svg';

const DefaultDashPage = () => {
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    setImage(image);
  }, []);

  return (
    <>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
      }}>
        <img src={image} alt="default" style={{width: '35vw'}} />
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
