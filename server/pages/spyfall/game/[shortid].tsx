import React, { Component, ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import io from 'socket.io-client';
import {Table, 
        TableHead,
        TableRow,
        TableBody,
        TableCell,
        Card,
        Button,
        } from '@material-ui/core';
 
import { withStyles } from '@material-ui/core/styles';

import SimpleDialog from '../../../public/components/dialog'

type GameState = "PREGAME" | "INGAME"

interface Props {
    id: string,
    classes: {
        root: string,
        centerContainer: string,
        inputContainer: string,
        buttonStyle: string,
        title: string,
        spacer: string
    }
}

interface State {   
    gameCode: string, 
    players: Array<{name: string}>,
    myName: String, 
    timer: number, 
    locations: Array<{location: string}>,
    gameState: GameState, 
    dialogOpen: boolean,
    blurOnDialogToggle: {filter: string} | {}
}

const styles = (theme: object): object => ({
root: {
    height: '100vh',
    width: '100vw',
   
},
centerContainer: {
    minWidth: 275,
    maxWidth: 500,
    margin: '0 auto',
    height: '100%',
    overflow: 'scroll', 
    textAlign: 'center'
}, 
inputContainer: {
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
    height: '30%'
},
});

class ClientGamePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        
        this.state = {
            gameCode: props.id.toUpperCase(), 
            players: [],
            myName: '', 
            timer: 8, 
            locations: [],
            gameState: 'PREGAME',
            dialogOpen: false,
            blurOnDialogToggle: {}
        }
    }

    loadSocketIOCode = (myName: string): void => {
        const socket = io.connect('/spyfall/socket');

        socket.emit('join', { gameCode: this.state.gameCode });

        socket.emit('newPlayer', {name: myName, room: this.state.gameCode})

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });

        socket.on('updatePlayers',  (data) => {
            console.log('updating players arr')
            let state = {players: data.players}
            this.setState(state)
        })
    }

    componentDidMount = async () => {
        let myName = localStorage.getItem('myName')
        this.loadSocketIOCode(myName)

        // update game code
        let res = await fetch('http://localhost:4000/api/spyfall/getLocations')
        let locations = await res.json()
        let state = {
            myName: myName,
            locations: locations
        }
        this.setState(state);
        //console.log(this.state)
    }

    handleClickOpen = () => {
        let state = {
            dialogOpen: true,
            blurOnDialogToggle: {filter: 'blur(1px)'}
        }
        this.setState(state);
    };

    handleClose = () => {
        let state = {
            dialogOpen: false,
            blurOnDialogToggle: {}
        }
        this.setState(state);
      };

    toggleLocationLineThrough = (event): void => {
        let elem = event.target

        if(elem.style.textDecoration === 'line-through') {
            elem.style.textDecoration = 'none'
        } else {
            elem.style.textDecoration = 'line-through'
        }
    }

    toggleGameState = (): void => {
        if(this.state.gameState === 'PREGAME') {
            this.setState({gameState: 'INGAME'})
        } else {
            this.setState({gameState: 'PREGAME'})
        }
    }

    render(): ReactNode {
        const { classes } = this.props;

        let players = [{name:'shane'}, {name: 'jon'}, {name: 'alex'}]


        if(this.state.gameState === 'PREGAME')
        {
                return (
                <div className={classes.root}>
                <Card className={classes.centerContainer}>
                    <div className={classes.title}>
                            Spyfall
                            <h1>{this.state.gameCode}</h1>
                    </div>
            
                    <div className={classes.inputContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Players</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                this.state.players.map(player => <TableRow key={player.name}>
                                                        <TableCell align="center" >{player.name}</TableCell>
                                                    </TableRow>)
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <br/>

                    {/* This toggle button is here for demonstration purposed
                        The final gamestate toggling would be done through the
                        startGame function in the game/index.tsx (the HostMenuPage)
                    */}
                    <Button onClick={this.toggleGameState} color='primary' className={classes.buttonStyle}>
                         Toggle GameState   
                    </Button>    
                </Card> 
                </div>
            )
        } else { // game time
            return (
                <div className={classes.root}  style={this.state.blurOnDialogToggle}>
                <Card className={classes.centerContainer}>
                    <div className={classes.title}>
                            Spyfall: <span>{this.state.gameCode}</span>
                    </div>
                
                <Button color='secondary' onClick={this.handleClickOpen} style={{background: 'white', marginBottom: '20px'}}>
                    Show Role
                </Button>
                <SimpleDialog open={this.state.dialogOpen} onClose={this.handleClose} ></SimpleDialog>

                <div className={classes.inputContainer}>
                    <div style={{display:'flex', flexWrap:'wrap', textAlign: 'left'}}>
                        {
                            this.state.locations.map(element => <div onClick={this.toggleLocationLineThrough} style={{width:'50%', paddingLeft: '20px', paddingTop: '5px'}} key={element.location}>
                                                    {element.location}
                                                </div>)
                            }
                    </div>
                </div>

                 {/* This toggle button is here for demonstration purposed
                        The final gamestate toggling would be done through the
                    startGame function in the game/index.tsx (the HostMenuPage)
                */}
                <br/>
                <Button onClick={this.toggleGameState} color='primary' className={classes.buttonStyle}>
                        Toggle GameState   
                </Button>  

                </Card> 
            </div>
            )

        }

       
    }
}

export default withStyles(styles, { withTheme: true })(ClientGamePage)


export const getServerSideProps: GetServerSideProps = async (context) => {
    
    return {
        props: {id: context.params.shortid}
      }
  }