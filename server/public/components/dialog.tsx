import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
   test: {
       background: 'white'
   }
  });

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;
  
    const handleClose = () => {
      onClose()
    };
  
    return (
      //<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <Dialog open={open} onClose={handleClose} className={classes.test}>
        <DialogTitle >Role</DialogTitle>
        <div>
            This is your role
        </div>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
    //selectedValue: PropTypes.string.isRequired,
  };

  export default SimpleDialog