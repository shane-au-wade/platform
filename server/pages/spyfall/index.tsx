import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import {Card,
        Button,
       } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface Props {
    classes: {
        root: string,
        centerContainer: string,
        buttonContainer: string,
        buttonStyle: string,
        title: string,
        spacer: string
    }
}
interface State {}

const styles = (theme:object): object => ({
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
buttonStyle: {
    width: '200px', 
    background: 'white', 
    margin: '0 auto', 
    marginBottom: '20px'
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

class SpyfallHomePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    componentDidMount = async () => {
        const res = await fetch('http://localhost:4000/api/spyfall/getShortID')
        let data = await res.json()
        console.log(data)
        // localStorage is my simple global state mangement tool
        // It is sufficient for such a simple application, but
        // it would be nice to experiement with redux saga
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
                    <div className={classes.spacer}/>
                    <div className={classes.buttonContainer}>
                        <Link href="/spyfall/game">
                            <Button color='secondary'  className={classes.buttonStyle}>
                                Create Room
                            </Button>
                        </Link>
                        <Link href="/spyfall/join">
                            <Button color='primary' className={classes.buttonStyle}>
                                Join Room
                            </Button>
                        </Link>
                    </div>
               </Card> 
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SpyfallHomePage)
