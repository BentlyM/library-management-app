import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

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
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              color: 'white',
            }}
          >
            <LibraryBooksIcon style={{position: 'relative', top:'2px'}}/>
            Library Management
          </Typography>
          <ul className="nav-bar" style={listStyling}>
            <li>
              <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: 'none', color: 'white' }}>
                Profile
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={'pricing'}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                style={{ textDecoration: 'none', color: 'white' }}
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
