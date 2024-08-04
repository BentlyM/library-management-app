import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const listStyling = {
    'list-style-type': 'none',
    display: 'flex',
    gap: '15px',
  };

  return (
    <>
      <div className="navigation">
        <Box
          padding={'5px'}
          sx={{
            borderBottom: '1px solid lightgray',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Library Management</Typography>
          <ul className="nav-bar" style={listStyling}>
            <li>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: 'none', color: 'black' }}>
                Profile
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={'login'}
              >
                Login
              </Link>
            </li>
          </ul>
        </Box>
      </div>
    </>
  );
}
