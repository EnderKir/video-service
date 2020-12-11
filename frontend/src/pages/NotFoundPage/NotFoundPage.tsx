import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <Box height={'80vh'}
         display={'flex'}
         flexDirection={'column'}
         justifyContent={'center'}
         alignItems={'start'}
         className={'not-found-page'}
    >
      <Typography variant={'h1'} className={'text'}>404</Typography>
      <Typography variant={'h2'} className={'text'}>We looked everywhere</Typography>
      <Typography variant={'h2'} className={'text'}>Seems like this page is missing</Typography>

      <Button variant={'outlined'} color={'primary'} component={NavLink} to={'/'}>Go home</Button>
    </Box>
  );
}

export default NotFoundPage;
