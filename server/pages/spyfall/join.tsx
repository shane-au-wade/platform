import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import {Paper, 
        Card,
        Button,
        TextField 
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
inputContainer: {
    display: 'flex',
    flexDirection: 'column'
}, 
title: {
    width: '100%',
    textAlign: 'center',
    padding: 10
}, 
spacer: {
    height: '30%'
}
});

class join extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            name: '',
            gameCode: '',
        }
    }

    componentDidMount = () => {
      
    }

    handleChange = (event) => {
        //console.log(event.target.id)
        event.target.value = event.target.value.toUpperCase()
        let state = {}
        state[event.target.id] = event.target.value
        this.setState(state);
    }

    handleJoin = () => {
        console.log(this.state)
        localStorage.setItem('myName', this.state.name)
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

                <div className={classes.inputContainer}>
                    <TextField id="gameCode" label="Game Code" autoCorrect='off' spellCheck="false" onChange={this.handleChange} style={{width: '200px', margin: '0 auto', marginBottom: '20px'}}></TextField>
                    <TextField id="name" label="Name" autoCorrect='off' spellCheck="false" onChange={this.handleChange}  style={{width: '200px', margin: '0 auto', marginBottom: '20px'}}></TextField>
                    
                    <Link href='/spyfall/game/[shortid]' as={`/spyfall/game/${this.state.gameCode}`}>
                         <Button onClick={this.handleJoin} color='primary' style={{width: '200px', background: 'white', margin: '0 auto', marginBottom: '20px'}}>
                            Join
                        </Button>
                    </Link>
                   
                    <br></br>
                    <br></br>
                    <Link href='/spyfall'>
                        <Button color='secondary' style={{width: '200px', background: 'white', margin: '0 auto', marginBottom: '20px'}}>
                            Back
                        </Button>
                    </Link>
                   
                </div>
                    
               </Card> 
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(join)
