import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
//import DialogTitle from '@material-ui/core/DialogTitle';
import {Paper, Avatar, Typography} from '@material-ui/core/';

interface props {
  
}

const useStyles = makeStyles(theme => ({
   root: {
      height: '100vh',
      display:'flex',
      flexDirection: 'column',
      textAlign:'center'
    },
    backgroundImage: {
      position:'relative',
      height: '100vh',
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    bannerText: {
      position: 'relative',
      bottom: 220,
      fontSize: 40,
      fontWeight: 600,
      color: '#fff',
      backgroundColor: theme.palette.info.main,
      boxShadow: theme.shadows[10],
      width: 'fit-content',
      margin: '0 auto',
      padding: 30,
      borderRadius: 60,
      zIndex: 6

    },
    imageContainer: {
      position:'relative',
      bottom: '90vh',
      height: 500,
      margin: '0 auto',
      textAlign:'center'
    },
    image: {height: 500,
      width: 500,
      margin: '0 auto',
      zIndex: 10,
      boxShadow: theme.shadows[5]
    },
    imageBacking: {
      position: 'relative',
      top: -510,
      height: 520,
      width: 520,
      borderRadius: 260,
      backgroundColor: theme.palette.info.main,
      boxShadow: theme.shadows[10]
    }
  }));

function ProfileTile(props) {
    const classes = useStyles();
    const { linkedin, github, instagram } = props;

    return (
        <Paper className={classes.root}>
            <img className={classes.backgroundImage} src='/images/sunset.jpg'></img>
            <Typography className={classes.bannerText}>
                  Pleasure to meet you, I'm Shane Wade
            </Typography>
            <div className={classes.imageContainer}>
              <Avatar className={classes.image}  alt='Shane Wade' src='/images/sw_profile.png'></Avatar>
              <div className={classes.imageBacking} ></div>
            </div>
        </Paper>
    );
  }
  
  ProfileTile.propTypes = {
   
  };

  export default ProfileTile