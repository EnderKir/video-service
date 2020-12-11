import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './theme';
import {
  createMuiTheme,
  ThemeOptions,
  ThemeProvider,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './index.css';

const _theme: ThemeOptions = createMuiTheme(theme);

ReactDOM.render(
  <ThemeProvider theme={_theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
