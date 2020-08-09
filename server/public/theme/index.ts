import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
    },
    secondary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
        contrastText: '#fff'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'rgb(33, 33, 36)',
    }
  }, 
});

export default theme;