import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
//import DialogTitle from '@material-ui/core/DialogTitle';
import {Paper, IconButton} from '@material-ui/core/';

interface props {
  linkedin: string,
  github: string, 
  instagram: string
}

const useStyles = makeStyles( theme => ({
   root: {
     padding: 20,
     
   },
   iconContainer: {
        backgroundColor: theme.palette.info.main, 
        margin: '0 auto', 
        width:"fit-content",
        height: 60,
        borderRadius: 30,
        '&:hover': {
            boxShadow: theme.shadows[10],
            
         }
    },

  }));

function SocialConnections(props) {
    const classes = useStyles();
    const { linkedin, github, instagram } = props;

    return (
        <Paper className={classes.root}>
            <Paper className={classes.iconContainer}>
                <a href={github} target='_blank'>
                    <IconButton>
                        <img src='/images/github-logo.png'></img>
                    </IconButton>
                </a>
                <a href={linkedin} target='_blank'>
                    <IconButton>
                        <img src='/images/linkedin-logo.png'></img>
                    </IconButton>
                </a>
                <a href={instagram} target='_blank'>
                    <IconButton>
                        <img src='/images/instagram-logo.png'></img>
                    </IconButton>
                </a>
          </Paper>
        </Paper>
    );
  }
  
  SocialConnections.propTypes = {
    linkedin: PropTypes.func.isRequired,
    github: PropTypes.func.isRequired, 
    instagram: PropTypes.func.isRequired
  };

  export default SocialConnections