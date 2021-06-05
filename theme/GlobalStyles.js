import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100vh',
        width: '100vw',
      },
      body: {
        backgroundColor: '#f4f6f8',
        height: '100%',
        width: '100%',
        fontFamily: '"Raleway" !important',
      },
      a: {
        textDecoration: 'none !important',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
