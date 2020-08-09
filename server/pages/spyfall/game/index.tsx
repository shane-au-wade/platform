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
        TextField,
        NativeSelect,
        FormControl,
        InputLabel
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
},
startButton: {
    width: '200px',
    margin: '0 auto',
    marginBottom: '20px'
}
});

class join extends Component<Props, State> {

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

    isValidNewPlayer = async (playerName) => {

        return new Promise((resolve, reject) => {
            console.log('player in isValid:', playerName)
                    console.log(this.state.players)

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

    componentDidMount = async () => {

        let gameCode = localStorage.getItem('gameCode')

        const socket = io.connect('/spyfall/socket');

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });

        socket.emit('join', { gameCode: gameCode });

        socket.on('newPlayer', async (player) => {
            console.log('new player joining:', player)

            let state = {}
            state.players = this.state.players
            let valid = await this.isValidNewPlayer(player.name)
            console.log(valid)
            if(valid)
            {
                console.log('valid player')
                state.players.push(player)
                this.setState(state); 
                socket.emit('updatePlayers', { players: state.players, room: this.state.gameCode })
            }
            else {
                socket.emit('updatePlayers', { players: state.players, room: this.state.gameCode })
            }
           
            if(this.state.players.length >= 3)
            {
                this.enableStart()
            }
           
        })

        // update game code
        let res = await fetch('http://localhost:4000/api/spyfall/getLocations')
        let locations = await res.json()

        let state = {}
        state.gameCode = gameCode
        state.locations = locations
        this.setState(state);
    }

    handleTimeSelect = (event) => {
        console.log(event.target.value)
    }

    enableStart = () => {
        let state = {}
        state.startButton = { background: 'rgba(52, 235, 110, 0.9)'}
        state.disableStart = false
        this.setState(state);
    }

    disableStart = () => {
        let state = {}
        state.startButton = { background: 'rgba(52, 235, 110, 0.5)'}
        state.disableStart = true
        this.setState(state);
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
                    
                    <Button onClick={this.handleJoin} disabled={this.state.disableStart} className={classes.startButton} style={this.state.startButton}>
                        Start Game
                    </Button>

                </div>
                    
               </Card> 
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(join)