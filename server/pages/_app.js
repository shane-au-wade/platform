import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Switch, Paper, Button, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import darkMode from '../public/theme/darkMode';
import lightMode from '../public/theme/lightMode'
import Link from 'next/link'

const DarkModeSwitch = withStyles({
  root: {
    width: 52,
    height: 32,
    padding: 0,
    marginTop: 'auto',
  },
  switchBase: {
    padding: 0,
  },
  track: {
    borderRadius: 16
  }
})(Switch);

const NavBar = withStyles({
  root: {
    position: 'fixed',
    top:'0', 
    height: 50,
    width: '100%', 
    zIndex: '9999', 
    borderRadius: 0,
    padding: 9
  }
})(Paper);



export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [theme, setTheme] =  useState(darkMode)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  let handleThemeToggle = (event) => {  
    // console.log('toggling theme')
    // console.log(event.target.checked)
    if(event.target.checked === true) {
      setTheme(lightMode)
    } else {
      setTheme(darkMode)
    }
  }

  return (
    <React.Fragment>
      <Head>
        {/* <title>Stormcore</title> */}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NavBar>
        <Link href='/'>
          <Button>
            <Typography>
              Home
            </Typography>
            
          </Button>
        </Link>
        <Button>
          <Typography>
          Contact Me
          </Typography>
        </Button>
        <Link href='/spyfall'>
          <Button>
           <Typography>
            Spyfall
            </Typography>
          </Button>
        </Link>
        <DarkModeSwitch 
          icon={'🌒'}
          checkedIcon={'☀️'}
          color='primary'
          onChange={handleThemeToggle}
        ></DarkModeSwitch>
      </NavBar>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};