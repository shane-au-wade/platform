import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import {Card,
        Button,
       } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface Props {}
interface State {}

const styles = theme => ({
root: {
    height: '100vh',
    width: '100vw'
},
centerContainer: {
    minWidth: 275,
    maxWidth: 500,
    margin: '0 auto',
    height: '100%'
    
}, 
buttonContainer: {
    display: 'flex',
    flexDirection: 'column'
}, 
title: {
    width: '100%',
    textAlign: 'center',
    padding: 10
}, 
spacer: {
    height: '40%'
}
});

class home extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
    
        }
    }

    componentDidMount = async () => {
        const res = await fetch('http://localhost:4000/api/spyfall/getShortID')
        let data = await res.json()
        console.log(data)
        localStorage.setItem('gameCode', data.id)
    }

    render(): ReactNode {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
               
               <Card className={classes.centerContainer}>
                   <div className={classes.title}>
                        Spyfall
                   </div>
            
                   <div className={classes.spacer}></div>

                <div className={classes.buttonContainer}>
                <Link href="/spyfall/game">
                    <Button color='secondary' style={{width: '200px', background: 'white', margin: '0 auto', marginBottom: '20px'}}>
                        Create Room
                    </Button>
                </Link>
                <Link href="/spyfall/join">
                    <Button color='primary' style={{width: '200px', background: 'white', margin: '0 auto', marginBottom: '20px'}}>
                        Join Room
                    </Button>
                </Link>
                    
                </div>
                    
               </Card> 
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(home)
