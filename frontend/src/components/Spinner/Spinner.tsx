import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

const Spinner = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color={'inherit'} />
    </Backdrop>
  );
};

export default Spinner;
