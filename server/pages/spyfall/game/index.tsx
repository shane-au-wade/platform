import React, { Component, ReactNode } from 'react'
//import { GetServerSideProps } from 'next'
import io from 'socket.io-client';
import {Table, 
        TableHead,
        TableRow,
        TableBody,
        TableCell,
        Card,
        Button,
        NativeSelect,
        FormControl,
        InputLabel
        } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface Props {
    id: string,
    classes: {
        root: string,
        centerContainer: string,
        inputContainer: string,
        title: string,
        spacer: string,
        startButton: string
    }
}
interface State { 
    gameCode: string, 
    startButton: { background: string },
    disableStart: boolean,
    players: Array<{name: string}>,
    timer: number, 
    locations: Array<{location: string}>,
}


const styles = (theme: object): object => ({
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
},
startButton: {
    width: '200px',
    margin: '0 auto',
    marginBottom: '20px'
}
});

class HostGamePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        
        // players example players: [{name:'shane'}, {name: 'jon'}]
        this.state = {
            gameCode: '', 
            startButton: { background: 'rgba(52, 235, 110, 0.5)'},
            disableStart: true,
            players: [],
            timer: 8, 
            locations: []
        }
    }

    isValidNewPlayer = async (playerName: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            //console.log('player in isValid:', playerName)
            //console.log(this.state.players)
            if(this.state.players.length == 0) {
                resolve(true)
            }
            else {
                for(let i=0; i < this.state.players.length; ++i ) {
                    if(this.state.players[i].name == playerName) {
                        resolve(false)
                    }
                    if((i+1)===this.state.players.length) {
                        resolve(true)
                    }
                }
            } 
        });
    }

    loadSocketIOCode = (gameCode: string): void => {
        const socket = io.connect('/spyfall/socket');

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });

        socket.emit('join', { gameCode: gameCode });

        socket.on('newPlayer', async (player) => {
            console.log('new player joining:', player)

            let state = {
                players: this.state.players
            }
            let isPlayerValid = await this.isValidNewPlayer(player.name)
            //console.log(isPlayerValid)
            if(isPlayerValid)
            {
                //console.log('valid player')
                state.players.push(player)
                this.setState(state); 
                socket.emit('updatePlayers', { players: state.players, room: this.state.gameCode })
            }
            else {
                // this is a returning player and we should still update that
                // new player with the existing players array
                socket.emit('updatePlayers', { players: state.players, room: this.state.gameCode })
            }
           
            if(this.state.players.length >= 3)
            {
                // allows the game to be played with host + 3 or more players 
                this.enableStart()
            }
        })

    }

    componentDidMount = async (): Promise<void> => {

        let gameCode = localStorage.getItem('gameCode')

        this.loadSocketIOCode(gameCode)

        // update game code
        let res = await fetch('http://localhost:4000/api/spyfall/getLocations')
        let locations = await res.json()
        let state = {
            gameCode: gameCode,
            locations: locations
        }
        this.setState(state);
    }

    handleTimeSelect = (event):void => {
        console.log(event.target.value)
    }

    enableStart = (): void => {
        let state = {
            startButton: { background: 'rgba(52, 235, 110, 0.9)'},
            disableStart: false
        }
        this.setState(state);
    }

    disableStart = (): void => {
        let state = {
            startButton: { background: 'rgba(52, 235, 110, 0.5)'},
            disableStart: true
        }
        this.setState(state);
    }

    handleGameStart = (): void => {
        // handle the game start logic
    }

    render(): ReactNode {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
               <Card className={classes.centerContainer}>
                   <div className={classes.title}>
                        Spyfall
                        <h1>{this.state.gameCode}</h1>
                   </div>
            
                <div className={classes.inputContainer}>
                    {/* Players table that will be updated with socket.io */}
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

                    {/* time select options */}
                    <FormControl style={{width: '100px', margin: '0 auto', marginTop: '20px', marginBottom: '20px'}}>
                        <InputLabel>Timer</InputLabel>
                        <NativeSelect
                        onChange={this.handleTimeSelect}
                        name='timer'
                        defaultValue={8}
                        >
                            <option value={6}>6:00</option>
                            <option value={7}>7:00</option>
                            <option value={8}>8:00</option>
                            <option value={9}>9:00</option>
                            <option value={10}>10:00</option>
                        </NativeSelect>
                    </FormControl>
                    
                    <Button onClick={this.handleGameStart} disabled={this.state.disableStart} className={classes.startButton} style={this.state.startButton}>
                        Start Game
                    </Button>

                </div>
                    
               </Card> 
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(HostGamePage)