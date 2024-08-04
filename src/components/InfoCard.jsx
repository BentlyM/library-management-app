import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const InfoCard = ({ title, titleHook, sentence, width, height, align }) => {
  return (
    <>
      <Box
        minWidth={width}
        maxWidth={width}
        height={height}
        display="flex"
        flexDirection={'column'}
        flexWrap={'wrap'}
        gap={2}
        p={2}
        color={'white'}
        alignItems={align}
      >
        {title && (
          <Typography
            fontSize={'14px'}
            justifySelf={'start'}
            sx={{ letterSpacing: '2px' }}
          >
            {title}
          </Typography>
        )}
        <Typography variant="h6" fontWeight={'bolder'}>
          {titleHook}
        </Typography>
        <Typography>{sentence}</Typography>
        <Button variant="contained" sx={{ width: 'fit-content' }}>
          {title?.toLowerCase() == 'welcome' ? 'Explore' : 'Learn More'}
        </Button>
      </Box>
    </>
  );
};

export default InfoCard;
