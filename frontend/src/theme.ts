import { ThemeOptions } from '@material-ui/core';

const theme: ThemeOptions = {
  palette: {
    primary: {
      light: '#fafafa',
      main: '#573e8c',
      dark: '#eeeeee',
    },
    secondary: {
      light: '#9ccc65',
      main: '#8bc34a',
      dark: '#7cb342',
    },
    background: {
      default: '#d2d9d6',
      paper: '#000000a3',
    },
    type: 'dark',
  },
  typography: {
    allVariants: {
      color: '#f1f1f1',
    },
    h1: {
      fontSize: 50,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 27,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 17,
    },
    h6: {
      fontSize: 15,
    },
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
      '"Fira Sans Extra Condensed"',
      '"Raleway"',
    ].join(','),
  },
};

export { theme };
