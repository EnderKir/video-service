import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { Box } from '@material-ui/core';
import Routes from './Routes';

const App = () => {
  return (
    <Box mt={6} ml={1} p={5} css={{minHeight: '90vh'}}>
      <Router>
        <Header/>
        <Routes/>
      </Router>
    </Box>
  );
};

export default App;
